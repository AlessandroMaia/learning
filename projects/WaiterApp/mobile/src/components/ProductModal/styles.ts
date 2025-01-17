import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
  width: 100%;
  height: 200px;
  align-items: flex-end;
`;

export const ButtonClose = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin: 24px;
`;

export const ModalBody = styled.View`
  flex: 1;
  background: #fafafa;
  padding: 32px 24px 0;
`;

export const Header = styled.View`
  gap: 8px;
`;

export const IngredientsContainer = styled.View`
  margin-top: 32px;
`;

export const Ingredient = styled.View`
  border: 1px solid rgba(204, 204, 204, 0.3);
  border-radius: 8px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin-bottom: 4px;
`;

export const Footer = styled.View`
  background: #fff;
  min-height: 110px;
  padding: 16px 24px;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PriceContainer = styled.View`
`;
