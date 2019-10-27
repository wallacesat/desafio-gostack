import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 0px auto 0px;
  padding-top: 5px;
  min-height: 100%;
  height: auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    > span {
      color: #f94d6a;
      align-self: flex-start;
      margin: -5px 5px 10px;
      font-weight: bold;
      font-size: 12px;
    }

    > input,
    textarea {
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

    > textarea {
      height: auto;
      padding: 15px;
    }

    > hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 10px 0 20px;
    }

    > button {
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
        color: #f2f2f2;
        margin-left: 10px;
      }
    }
  }
`;
