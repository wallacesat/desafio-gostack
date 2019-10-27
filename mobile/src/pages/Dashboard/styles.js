import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 30,
  },
})``;

export const DatePicker = styled.View`
  background: #fff;
`;

export const AuxiliarButtons = styled.View`
  width: 100%;
  height: 40;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
  margin-bottom: 10;
`;

export const CancelButton = styled.TouchableOpacity`
  padding: 10px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  padding: 10px;
`;

export const TextButton = styled.Text`
  color: #007aff;
  font-size: 16;
`;
