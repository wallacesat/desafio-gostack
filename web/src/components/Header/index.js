import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="Meetapp" />
          </Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>
                {user.name}
                <Link to="/profile">Meu perfil</Link>
              </strong>
            </div>
          </Profile>
          <button type="button" onClick={handleSignOut}>
            Sair
          </button>
        </aside>
      </Content>
    </Container>
  );
}
