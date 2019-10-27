import { isAfter, parseISO, isBefore, subMinutes, addMinutes } from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import Queue from '../../lib/Queue';
import InscriptionMail from '../jobs/InscriptionMail';

class InscriptionController {
  async index(req, res) {
    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: Meetup,
          as: 'meetups',
          attributes: ['id', 'title', 'description', 'date', 'past'],
          through: { attributes: [] },
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
        },
      ],
    });

    const inscriptions = user.meetups;

    if (!inscriptions[0]) {
      return res.json([]);
    }

    return res.json(inscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id'],
          through: { attributes: [] },
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'name'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: Meetup,
          as: 'meetups',
          attributes: ['id', 'date'],
          through: { attributes: [] },
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({
        error: 'Meetup não encontrado',
      });
    }

    if (meetup.user_id === req.userId) {
      return res.status(400).json({
        error: `Você só pode se inscrever em meetups cujo você não seja o organizador`,
      });
    }

    if (
      meetup.users[0] &&
      meetup.users.find(meetupUser => meetupUser.id === req.userId)
    ) {
      return res.status(400).json({
        error: 'Você já se inscreveu nesse meetup',
      });
    }

    const meetupDate = parseISO(meetup.date);

    if (isAfter(meetupDate, new Date())) {
      return res.status(400).json({
        error: `Você só pode se increver em meetups antes da data de ocorrência`,
      });
    }

    const { meetups } = user;
    const anyMeetupsInThisDate = meetups.filter(item => {
      return (
        isAfter(item.date, subMinutes(meetup.date, 59)) &&
        isBefore(item.date, addMinutes(meetup.date, 59))
      );
    });

    if (anyMeetupsInThisDate[0]) {
      return res.status(400).json({
        error: `Você já está inscrito em algum meetup nesse horário. As inscrições devem ter ao menos uma hora de intervalo entre elas`,
      });
    }

    await meetup.addUser(req.userId);

    await Queue.add(InscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id'],
          through: { attributes: [] },
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({
        error: 'Meetup não encontrado',
      });
    }

    const userMeetups = await meetup.getUsers({
      where: { id: req.userId },
      attributes: ['id'],
    });

    if (!userMeetups[0]) {
      return res
        .status(400)
        .json({ error: 'Usuário não inscrito nesse meetup' });
    }

    await meetup.removeUser(req.userId);

    return res.json({
      success: 'Inscrição cancelada com sucesso',
    });
  }
}

export default new InscriptionController();
