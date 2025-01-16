import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Text } from '../components/Text';
import { ICartItem } from '../types/CartItem';
import { ICategory } from '../types/Category';
import { IProduct } from '../types/Product';
import { api } from '../utils/api';
import {
  CategoriesContainer,
  CenteredContainer,
  Container,
  Footer,
  MenuContainer,
} from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisible(false);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddOrRemoveToCart(
    product: IProduct,
    subtract: boolean = false
  ) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.product._id === product._id);

      if (index < 0) {
        return prev.concat({ product, quantity: 1 });
      }

      const newCartItem = [...prev];
      const item = prev[index];

      if (subtract) {
        if (item.quantity === 1) {
          newCartItem.splice(index, 1);
        } else {
          newCartItem[index] = {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return newCartItem;
      } else {
        newCartItem[index] = {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return newCartItem;
    });
  }

  async function handleSelectCategory(categoryId: string) {
    console.log('🚀 ~ handleSelectCategory ~ categoryId:', categoryId);
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);

    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  useEffect(() => {
    Promise.all([api.get('/categories'), api.get('/products')]).then(
      ([categoryRes, productRes]) => {
        setCategories(categoryRes.data);
        setProducts(productRes.data);
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <>
      <Container>
        <Header table={selectedTable} onCancelOrder={handleResetOrder} />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color={'#D73035'} size={'large'} />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color={'#D73035'} size={'large'} />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu
                      onAddToCart={handleAddOrRemoveToCart}
                      products={products}
                    />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color={'#666'} style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>

      <Footer>
        {!selectedTable && (
          <Button
            onPress={() => setIsTableModalVisible(true)}
            disabled={isLoading}
          >
            Novo pedido
          </Button>
        )}

        {selectedTable && (
          <Cart
            cartItems={cartItems}
            handleAddOrRemoveToCart={handleAddOrRemoveToCart}
            onConfirmOrder={handleResetOrder}
            table={selectedTable}
          />
        )}
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
