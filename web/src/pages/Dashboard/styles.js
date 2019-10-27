import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin-top: 50px;

  div.meus-meetups-title {
    width: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    h1 {
      color: #f2f2f2;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 170px;
      height: 45px;
      background: #d44059;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      color: #f2f2f2;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#f94d6a')};
      }

      span {
        color: #f2f2f2;
        font-size: 18px;
        margin-left: 10px;
      }
    }
  }
`;
