import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 0 25px;
  width: 100%;
  height: 50px;
`;

export const LeftArrow = styled.TouchableOpacity`
  width: 15%;
`;

export const Date = styled.TouchableOpacity`
  width: 70%;
`;

export const TextDate = styled.Text`
  text-align: center;
  font-size: 22;
  color: #fff;
`;

export const RightArrow = styled.TouchableOpacity`
  width: 15%;
`;
