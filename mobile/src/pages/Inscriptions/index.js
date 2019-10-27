import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { listInscriptionRequest } from '~/store/modules/inscriptions/actions';

import Meetup from '~/components/Meetup';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Loader from '~/components/Loader';
import EmptyInscriptions from '~/components/Empty';

import { Container, List } from './styles';

export default function Inscriptions() {
  const { itens: inscriptions, loading } = useSelector(
    state => state.inscriptions
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listInscriptionRequest());
  }, []);

  return (
    <Background>
      <Container>
        <Header />
        {loading && <Loader size="large" color="#d44059" />}

        {!loading && inscriptions && inscriptions[0] ? (
          <List
            data={inscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup subscribed data={item} btnText="Cancelar inscrição" />
            )}
          />
        ) : (
          !loading && (
            <EmptyInscriptions>
              Você não se inscreveu em nenhum meetup ainda
            </EmptyInscriptions>
          )
        )}
      </Container>
    </Background>
  );
}

Inscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={26} color={tintColor} />
  ),
};
