import styled from 'styled-components';

export const Container = styled.div`
  border: solid red;
  max-width: 900px;
  height: 300px;
  border: none;
  border-radius: 5px;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    div#default-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.4);
      height: 300px;

      > span {
        font-weight: bold;
        font-size: 22px;
        color: rgba(255, 255, 255, 0.2);
      }
    }

    img {
      width: 900px;
      height: 300px;
      border-radius: 5px;
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
