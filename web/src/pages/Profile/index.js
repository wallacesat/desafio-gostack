import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

export default function Profile() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email()
      .required('O email é obrigatório'),
    oldPassword: Yup.string(),
    password: Yup.string().when('oldPassword', (oldPassword, field) =>
      oldPassword
        ? field
            .required('Nova senha obrigatória')
            .min(6, 'Sua senha deve conter no mínimo 6 dígitos')
        : field
    ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required('Confirmação de nova senha obrigatória')
            .oneOf(
              [Yup.ref('password')],
              'Confirmação de nova senha obrigatória'
            )
        : field
    ),
  });

  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de email" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Sua nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua nova senha"
        />

        <button type="submit">
          <MdAddCircleOutline color="#fff" size={20} />
          <span>Salvar perfil</span>
        </button>
      </Form>
    </Container>
  );
}
