import React from 'react';

import { GooSpinner } from 'react-spinners-kit';

import { Wrapper } from './styles';

export default function Loader() {
  return (
    <Wrapper>
      <GooSpinner size={64} color="#d44059" />
      <span>Processando</span>
    </Wrapper>
  );
}
