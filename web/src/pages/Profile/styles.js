import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 5px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 54px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 18px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 10px 0 20px;
    }

    > span {
      color: #f94d6a;
      align-self: flex-start;
      margin: -5px 5px 10px;
      font-weight: bold;
      font-size: 12px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      width: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-end;
      background: #d44059;
      font-weight: bold;
      color: #fff;
      border: 0;
      margin-top: 10px;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#f94d6a')};
      }

      > span {
        margin-left: 10px;
      }
    }
  }
`;
