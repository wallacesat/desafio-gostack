import React from 'react';
import { MdDeleteForever, MdEdit, MdToday, MdRoom } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { format } from 'date-fns';
import PT from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, Content, MeetupTitle, MeetupContent } from './styles';
import { deleteMeetupsRequest } from '~/store/modules/meetups/actions';

export default function Details(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  const meetup = useSelector(state => {
    return state.meetups.itens && id
      ? state.meetups.itens.find(item => item.id === Number(id))
      : false;
  });

  const dispatch = useDispatch();

  function handleDeleteMeetup() {
    dispatch(deleteMeetupsRequest(id));
  }

  return (id && meetup) || !id ? (
    <Container>
      <Content>
        <MeetupTitle>
          <h1>{meetup.title}</h1>
          <div className="buttons">
            <Link to={`/meetup/${id}`}>
              <MdEdit color="#f2f2f2" size={24} />
              <span>Editar</span>
            </Link>
            <button type="button" onClick={handleDeleteMeetup}>
              <MdDeleteForever color="#f2f2f2" size={24} />
              <span>Cancelar</span>
            </button>
          </div>
        </MeetupTitle>
        <MeetupContent>
          <img src={meetup.banner.url} alt={meetup.title} />
          <p className="description">{meetup.description}</p>
          <div className="date-location">
            <span className="date">
              <MdToday color="#f2f2f2" size={24} />
              {format(meetup.date, "dd 'de' MMMM, 'às' HH:mm'h'", {
                locale: PT,
              })}
            </span>
            <span className="location">
              <MdRoom color="#f2f2f2" size={24} />
              {meetup.location}
            </span>
          </div>
        </MeetupContent>
      </Content>
    </Container>
  ) : (
    <Redirect to="/dashboard" />
  );
}

Details.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
