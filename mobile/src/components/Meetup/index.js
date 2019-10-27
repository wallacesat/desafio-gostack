import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  inscriptionRequest,
  deleteInscriptionRequest,
} from '~/store/modules/inscriptions/actions';

import { Container, Content, Banner, MeetupTitle } from './styles';

import MeetupInfo from './MeetupInfo';
import Button from '~/components/Button';

export default function Meetup({ data, btnText, subscribed = false }) {
  const dateFormated = useMemo(() => {
    return format(parseISO(data.date), `dd 'de' MMMM', às' HH:mm'h'`, {
      locale: pt,
    });
  }, [data.date]);

  const userId = useSelector(state => state.user.profile.id);

  const dispatch = useDispatch();

  function handleInscription() {
    dispatch(
      subscribed
        ? deleteInscriptionRequest(data.id)
        : inscriptionRequest(data.id)
    );
  }
  const canSubscribe = !data.past && data.user.id !== userId;

  return (
    <Container>
      <Banner source={{ uri: data.banner.url }} />

      <Content>
        <MeetupTitle>{data.title}</MeetupTitle>
        <MeetupInfo icon="event">{dateFormated}</MeetupInfo>
        <MeetupInfo icon="room">{data.location}</MeetupInfo>
        <MeetupInfo icon="person">{`Organizador: ${data.user.name}`}</MeetupInfo>

        {canSubscribe && <Button onPress={handleInscription}>{btnText}</Button>}
      </Content>
    </Container>
  );
}
