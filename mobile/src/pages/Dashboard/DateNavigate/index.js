import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, LeftArrow, TextDate, RightArrow, Date } from './styles';

export default function DateNavigate({
  date,
  next,
  previous,
  handleShowDatepicker,
}) {
  const dateFormated = format(date, `dd 'de' MMMM'`, {
    locale: pt,
  });

  return (
    <Container>
      <LeftArrow>
        <Icon
          name="keyboard-arrow-left"
          size={36}
          color="#fff"
          onPress={() => previous()}
        />
      </LeftArrow>

      <Date onPress={() => handleShowDatepicker()}>
        <TextDate>{dateFormated}</TextDate>
      </Date>

      <RightArrow>
        <Icon
          name="keyboard-arrow-right"
          size={36}
          color="#fff"
          onPress={() => next()}
        />
      </RightArrow>
    </Container>
  );
}
