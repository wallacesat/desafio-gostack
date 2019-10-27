import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Container } from './styles';

import {
  createMeetupRequest,
  meetupUpdateRequest,
  meetupsRequest,
} from '~/store/modules/meetups/actions';

import BannerInput from './BannerInput';
import DatePicker from '~/components/DatePicker';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  date: Yup.date().required('A data é obrigatória'),
  location: Yup.string().required('A localização é obrigatória'),
  banner_id: Yup.number()
    .required('O banner é obrigatório')
    .label('banner'),
});

export default function Meetup(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  const [hasBanner, setHasBanner] = useState(false);
  const [onSubmited, setOnSubmited] = useState(false);

  const meetup = useSelector(state => {
    return state.meetups.itens && id
      ? state.meetups.itens.find(item => item.id === Number(id))
      : false;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!meetup) {
      dispatch(meetupsRequest());
    }
  }, []);

  function handleSubmit(data) {
    setHasBanner(true);
    if (!id) {
      dispatch(createMeetupRequest(data));
    } else {
      dispatch(meetupUpdateRequest({ ...data, id }));
    }
  }

  function validateBanner(ref) {
    if (ref) setHasBanner(!!ref);

    return !!ref;
  }

  function handleOnSubmited() {
    if (!onSubmited) {
      setOnSubmited(true);
    }
  }

  return (id && meetup) || !id ? (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <BannerInput name="banner_id" validateBanner={validateBanner} />
        <span
          style={{
            display: `${
              (!hasBanner && !onSubmited) || hasBanner ? 'none' : 'block'
            }`,
            marginTop: '-25px',
          }}
        >
          O banner é obrigatório
        </span>
        <Input name="title" placeholder="Título do meetup" />
        <Textarea
          name="description"
          placeholder="Descrição completa"
          rows={8}
        />
        <DatePicker name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />

        <button type="submit" onClick={handleOnSubmited}>
          <MdAddCircleOutline color="#fff" size={20} />
          <span>Salvar meetup</span>
        </button>
      </Form>
    </Container>
  ) : (
    <Redirect to="/dashboard" />
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
