import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { IProduct } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import { AddToCartButton, Product, ProductDetails, ProductImage, Separator } from './styles';

interface MenuProps {
  onAddToCart(product: IProduct): void;
  products: IProduct[]
}

export function Menu({ onAddToCart, products }: MenuProps){
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  function handleOpenModal(product: IProduct){
    setProductModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <Product onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.0.44:3001/uploads/${product.imagePath}`
              }}
            />
            <ProductDetails>
              <Text weight={600}>{product.name}</Text>
              <Text size={14} color={'#666'} style={{ marginVertical: 8 }}>{product.description}</Text>
              <Text size={14} weight={600}>{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </Product>
        )}
      />
      <ProductModal
        visible={productModalVisible}
        onClose={() => setProductModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
