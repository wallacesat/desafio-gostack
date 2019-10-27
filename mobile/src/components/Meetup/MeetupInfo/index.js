import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, MeetupText } from './styles';

export default function MeetupInfo({ children, icon }) {
  return (
    <Container>
      <Icon name={icon} size={20} color="#999" />
      <MeetupText>{children}</MeetupText>
    </Container>
  );
}
