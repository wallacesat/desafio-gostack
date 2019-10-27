import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';

import { Container, Content } from './styles';

import Meetups from '~/components/MeetupsList';
import Loader from '~/components/Loader';

import { meetupsRequest } from '~/store/modules/meetups/actions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetups.itens);
  let loading = true;
  loading = useSelector(state => state.meetups.loading);

  useEffect(() => {
    if (!meetups) dispatch(meetupsRequest());
  }, []);

  return (
    <Container>
      <Content>
        <div className="meus-meetups-title">
          <h1>Meus meetups</h1>
          <Link to="/meetup">
            <MdAddCircleOutline color="#f2f2f2" size={24} />
            <span>Novo meetup</span>
          </Link>
        </div>
        {!loading && meetups ? <Meetups meetups={meetups} /> : <Loader />}
      </Content>
    </Container>
  );
}
