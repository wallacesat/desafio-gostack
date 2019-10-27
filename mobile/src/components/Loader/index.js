import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export default function Loader({ size, color }) {
  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
    </Container>
  );
}
