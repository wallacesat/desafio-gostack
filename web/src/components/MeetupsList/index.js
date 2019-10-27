import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function MeetupsList({ meetups }) {
  const formatedDate = date =>
    format(date, "dd 'de' MMMM', às' HH:mm'h'", { locale: pt });

  return (
    <Container>
      {meetups && meetups[0] ? (
        meetups.map(meetup => (
          <Link to={`/details/${meetup.id}`} key={meetup.id}>
            <Content>
              <h3>{meetup.title}</h3>
              <div>
                <span>{formatedDate(meetup.date)}</span>
                <MdKeyboardArrowRight color="#f2f2f2" size={32} />
              </div>
            </Content>
          </Link>
        ))
      ) : (
        <div className="no-meetups">
          <h4>Você não cadastrou nenhum meetup ainda!</h4>
        </div>
      )}
    </Container>
  );
}

MeetupsList.defaultProps = {
  meetups: [],
};

MeetupsList.propTypes = {
  meetups: PropTypes.arrayOf(
    PropTypes.shape({
      past: PropTypes.bool,
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      date: PropTypes.date,
      banner: PropTypes.shape({
        url: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
        path: PropTypes.string,
      }),
    })
  ),
};
