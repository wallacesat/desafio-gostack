import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100%;

  div.react-datepicker-wrapper {
    min-width: 100%;
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    height: 54px;
    padding: 0 15px;
    color: #fff;
    margin: 0 0 10px;
    font-size: 18px;
    min-width: 100%;

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  > span {
    display: block;
    color: #f94d6a;
    align-self: flex-start;
    justify-self: center;
    margin: -5px 5px 10px;
    font-weight: bold;
    font-size: 12px;
  }
`;
