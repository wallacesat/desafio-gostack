import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div.no-meetups {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    color: #f2f2f2;
    height: 80px;
    background: rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: 5px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  height: 60px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 0 20px;
  color: #f2f2f2;

  &:hover {
    cursor: pointer;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      margin-right: 15px;
    }
  }
`;
