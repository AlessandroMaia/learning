import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Text } from './Text';

export function CustomDrawerContent({ ...props }:DrawerContentComponentProps): React.ReactNode {
  return (
    <DrawerContentScrollView>
      <Text>teste</Text>
    </DrawerContentScrollView>
  );
}
