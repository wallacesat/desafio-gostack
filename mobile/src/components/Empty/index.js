import React from 'react';

import { Container, Text } from './styles';

export default function Empty({ children }) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
}
