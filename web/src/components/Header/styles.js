import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #111;
  padding: 0 30px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
`;

export const Content = styled.div`
  height: 90px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    img {
      max-width: 30px;
    }
  }

  aside {
    display: flex;
    align-items: center;

    button {
      height: 45px;
      width: 70px;
      background: #d44059;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      color: #f2f2f2;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#f94d6a')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 30px;

    strong {
      display: block;
      font-size: 14px;
      color: #f2f2f2;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
`;
