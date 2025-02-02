import { FlatList, Modal } from 'react-native';
import { IProduct } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import {
  ButtonClose,
  Footer,
  FooterContainer,
  Header,
  Image,
  Ingredient,
  IngredientsContainer,
  ModalBody,
  PriceContainer,
} from './styles';

interface ProductModalProps {
  visible: boolean;
  onClose(): void;
  product: IProduct | null;
  onAddToCart(product: IProduct): void;
}

export function ProductModal({
  visible,
  onClose,
  product,
  onAddToCart,
}: ProductModalProps) {
  if (!product) return null;

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.0.44:3001/uploads/${product.imagePath}`,
        }}
      >
        <ButtonClose onPress={onClose}>
          <Close />
        </ButtonClose>
      </Image>
      <ModalBody>
        <Header>
          <Text weight={600} size={24}>
            {product.name}
          </Text>
          <Text color={'#666'}>{product.description}</Text>
        </Header>
        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight={600} color={'#666'}>
              Ingredients
            </Text>
            <FlatList
              style={{ marginTop: 16 }}
              data={product.ingredients}
              keyExtractor={(ingredient) => ingredient._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color={'#666'}>
                    {ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color={'#666'}>Preço</Text>
            <Text size={20} weight={600}>
              {formatCurrency(product.price)}
            </Text>
          </PriceContainer>
          <Button onPress={handleAddToCart}>Adcionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
