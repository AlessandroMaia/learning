import { theme } from '@constants/theme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useLinkBuilder } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from './Text';
import { View } from './View';

export function BottomTabBar({
  descriptors,
  insets,
  navigation,
  state,
}: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();

  if (state.routes.length > 4) throw new Error('Maximum of 4 tabs allowed');

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          padding: 10,
          borderRadius: 20,
          position: 'absolute',
          zIndex: 1,
          top: 0,
          left: 85
        }}
      >
        <View
          style={{
            backgroundColor: 'red',
            width: 14,
            height: 14,
            borderRadius: 7,
          }}
        ></View>
      </View>
      <View style={styles.container}>
        {state.routes.map(({ key, name, params }, index) => {
          const { options } = descriptors[key];

          const label: string =
            options.title !== undefined ? options.title : name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(name, params);
            }
          };

          return (
            <View
              key={key}
              style={{
                height: 68,
                alignItems: 'center',
                justifyContent: 'flex-end',
                backgroundColor: `rgb(${theme.colors.zinc[100]})`,
              }}
            >
              <Pressable style={styles.buttom} onPress={onPress}>
                {options.tabBarIcon!({
                  color: 'black',
                  focused: false,
                  size: 20,
                })}
                <Text>{label}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 92,
    justifyContent: 'flex-end'
  },
  container: {
    backgroundColor: `rgb(${theme.colors.zinc[100]})`,
    flexDirection: 'row',
    paddingHorizontal: 8,
    gap: 8,
    height: 75,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    elevation: 1,
  },
  buttom: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 68,
  },
});
