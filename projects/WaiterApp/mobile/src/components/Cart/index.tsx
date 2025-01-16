import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ICartItem } from '../../types/CartItem';
import { IProduct } from '../../types/Product';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Text } from '../Text';
import {
  Actions,
  Image,
  Item, ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary, TotalContainer
} from './styles';

interface CartProps {
  cartItems: ICartItem[];
  handleAddOrRemoveToCart(product: IProduct, subtract: boolean): void;
  onConfirmOrder(): void;
  table: string;
}

export function Cart({ cartItems, handleAddOrRemoveToCart, onConfirmOrder, table }: CartProps) {
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((acc, item) => {
    return acc = acc + (item.product.price * item.quantity);
  }, 0);

  async function handleConfirmORder() {
    const payload = {
      table,
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity
      }))
    };

    setIsLoading(true);
    await api.post('/orders', payload);
    setIsLoading(false);
    setIsOrderModalVisible(true);
  }

  function OnOk(){
    setIsOrderModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmedModal visible={isOrderModalVisible} onClose={OnOk}/>
      {cartItems.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.44:3001/uploads/${item.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {item.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight={600}>
                    {item.product.name}
                  </Text>
                  <Text size={14} color="#666">
                    {formatCurrency(item.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity onPress={() => handleAddOrRemoveToCart(item.product, false)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAddOrRemoveToCart(item.product, true)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color={'#666'}>
            Total
              </Text>
              <Text size={20} weight={600}>
                {formatCurrency(total)}
              </Text></>
          ) : (
            <Text color={'#999'}>
              Seu carrinho está vazio
            </Text>
          )}
        </TotalContainer>
        <Button onPress={handleConfirmORder} disabled={cartItems.length === 0} loading={isLoading}>
            Adcionar ao pedido
        </Button>
      </Summary>
    </>
  );
}
