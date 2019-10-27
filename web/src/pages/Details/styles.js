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
`;

export const MeetupTitle = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  h1 {
    color: #f2f2f2;
  }

  div.buttons {
    display: flex;
    a,
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      color: #f2f2f2;
      transition: background 0.2s;

      span {
        color: #f2f2f2;
        font-size: 18px;
        margin-left: 10px;
      }
    }

    a {
      background: #248cc9;
      width: 120px;
      margin-right: 20px;
      &:hover {
        background: ${darken(0.03, '#4dbaf9')};
      }
    }

    button {
      background: #d44059;
      width: 140px;
      &:hover {
        background: ${darken(0.05, '#f94d6a')};
      }
    }
  }
`;

export const MeetupContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 18px;
  color: #f2f2f2;

  img {
    width: 900px;
    height: 300px;
    border-radius: 5px;
    background: #eee;
  }

  p.description {
    margin: 20px 0;
  }

  div.date-location {
    display: flex;
    font-size: 14px;
    opacity: 0.5;

    span {
      margin-right: 30px;
      display: flex;
      align-items: center;

      > :first-child {
        margin-right: 5px;
      }
    }
  }
`;
