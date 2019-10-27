import * as Yup from 'yup';
import {
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
  endOfDay,
  addHours,
  getTime,
  startOfYear,
  endOfYear,
} from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

const requestDate = date => {
  return getTime(date);
};
class MeetupController {
  async index(req, res) {
    const { page = 1, date, next = false, previous = false } = req.query;

    const meetupDate = next && previous ? startOfDay(date) : Number(date);
    const minDate = Number(getTime(startOfYear(new Date())));
    const limitDate = Number(getTime(endOfYear(new Date())));

    if (!date) {
      return res.status(400).json({
        error: 'Data inválida',
      });
    }

    const fetchMeetups = async fetchDate => {
      const meetups = await Meetup.findAll({
        where: {
          date: {
            [Op.between]: [
              startOfDay(requestDate(fetchDate)),
              endOfDay(requestDate(fetchDate)),
            ],
          },
        },
        attributes: [
          'id',
          'title',
          'description',
          'location',
          'date',
          'past',
          'cancelable',
        ],
        limit: 10,
        offset: (page - 1) * 10,
        order: ['date'],
        include: [
          {
            model: File,
            as: 'banner',
            attributes: ['id', 'name', 'path', 'url'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email'],
          },
        ],
      });

      return meetups;
    };

    if (!previous && !next) {
      const meetups = await fetchMeetups(meetupDate);

      return res.json(meetups);
    }

    let requestMeetupDate;
    if (previous) {
      const result = await Meetup.findOne({
        where: {
          date: {
            [Op.lte]: endOfDay(meetupDate),
            [Op.gte]: startOfDay(minDate),
          },
        },
        attributes: ['date'],
        order: [['date', 'DESC']],
      });

      requestMeetupDate = result ? result.date : null;
    } else {
      const result = await Meetup.findOne({
        where: {
          date: {
            [Op.gte]: startOfDay(meetupDate),
            [Op.lte]: endOfDay(limitDate),
          },
        },
        attributes: ['date'],
        order: ['date'],
      });
      requestMeetupDate = result ? result.date : null;
    }

    const meetups = requestMeetupDate
      ? await fetchMeetups(requestMeetupDate)
      : [];

    return res.json(meetups);
  }

  async listMyMeetups(req, res) {
    const { page = 1 } = req.query;

    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      order: ['date'],
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Algum dado inválido, verifique os dados',
      });
    }

    const { title, description, location, date, banner_id } = req.body;

    const meetupDate = parseISO(date);

    if (isBefore(meetupDate, new Date())) {
      return res.status(400).json({
        error: 'Datas passadas não são permitidas',
      });
    }

    if (
      await Meetup.findOne({
        where: {
          date: { [Op.between]: [meetupDate, addHours(meetupDate, 1)] },
          user_id: req.userId,
        },
      })
    ) {
      return res.status(400).json({
        error:
          'Você já cadastrou um meetup nesse horário. Seus meetups devem ter ao menos uma hora de intervalo entre eles',
      });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      banner_id,
      user_id: req.userId,
    });

    const meetupFull = await Meetup.findByPk(meetup.id, {
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(meetupFull);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Algum dado inválido, verifique os dados',
      });
    }

    const { title, description, location, date, banner_id } = req.body;

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({
        error: 'Meetup não encontrado',
      });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(400).json({
        error: `Você não tem permissão para alterar esse meetup`,
      });
    }

    const meetupDate = parseISO(date);

    if (isAfter(new Date(), meetupDate)) {
      return res.status(400).json({
        error: `Você só pode alterar um meetup antes da data de ocorrência`,
      });
    }

    meetup.setAttributes({
      title,
      description,
      location,
      date,
      banner_id,
    });

    await meetup.save();

    const meetupFull = await Meetup.findByPk(meetup.id, {
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(meetupFull);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({
        error: 'Meetup não encontrado',
      });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(400).json({
        error: `Você não tem permissão para cancelar esse meetup`,
      });
    }

    const meetupDate = parseISO(meetup.date);

    if (isAfter(meetupDate, new Date())) {
      return res.status(400).json({
        error: `Você só pode cancelar meetups antes da data de ocorrência`,
      });
    }

    meetup.destroy();

    return res.json({
      success: 'Meetup cancelado com sucesso',
    });
  }
}

export default new MeetupController();
