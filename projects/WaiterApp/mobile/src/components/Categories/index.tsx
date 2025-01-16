import { useState } from 'react';
import { FlatList } from 'react-native';
import { ICategory } from '../../types/Category';
import { Text } from '../Text';
import { Category, Icon } from './styles';

interface CategoriesProps {
  categories: ICategory[];
  onSelectCategory(categoryId: string): Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(cagegoryId: string) {
    onSelectCategory(cagegoryId);
    setSelectedCategory(cagegoryId);
  }

  return (
    <FlatList
      horizontal
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category) => category._id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;

        return (
          <Category onPress={() => handleSelectCategory(!isSelected ? category._id : '')}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>
            <Text size={14} weight={600} opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </Category>
        );
      }}
    />
  );
}
