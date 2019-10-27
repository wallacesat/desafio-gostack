import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class InscriptionMail {
  get Key() {
    return 'InscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: `Nova incrição: ${meetup.title}`,
      template: 'inscription',
      context: {
        organizer: meetup.user.name,
        meetup: meetup.title,
        userName: user.name,
        userMail: user.email,
        date: format(new Date(), `'dia' dd 'de' MMMM, 'às' H:mm'h'`, {
          locale: pt,
        }),
      },
    });
  }
}

export default new InscriptionMail();
