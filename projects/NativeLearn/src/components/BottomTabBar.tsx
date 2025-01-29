import { theme } from '@constants/theme';
import { useThemeColor } from '@hooks/useThemeColor';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet, TextStyle } from 'react-native';
import Animated, {
  runOnUI,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Text } from './Text';
import { View } from './View';

const { width } = Dimensions.get('window');
const GAP = 20;
const ICON_SIZE = 24;
const EFFECT_SIZE = 36;

export function BottomTabBar({
  descriptors,
  navigation,
  state,
}: BottomTabBarProps) {
  const TabCount = state.routes.length;
  const focusedTab = state.index;

  const translateX = useSharedValue(0);
  const TabWidth = (width - GAP * (TabCount - 1)) / TabCount;
  const backgroundColor = useThemeColor({ color: 'background' });
  const borderColor = useThemeColor({ color: 'border' });

  useEffect(() => {
    runOnUI((index: number) => {
      translateX.value = withSpring(
        index * (TabWidth + GAP) + TabWidth / 2 - EFFECT_SIZE / 2
      );
    })(focusedTab);
  }, [focusedTab]);

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor,
          borderColor: borderColor,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.animationWrapper,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <View
          style={[
            styles.animationContainer,
            {
              borderColor: borderColor,
            },
          ]}
        >
          <View
            style={[
              styles.animationIcon,
              {
                backgroundColor: borderColor,
              },
            ]}
          />
        </View>
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined &&
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              merge: true,
              params: {},
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            style={[
              styles.button,
              {
                width: TabWidth,
              },
            ]}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: true,
                color: borderColor,
                size: ICON_SIZE,
              })}
            <Text
              style={{
                fontWeight: theme.font.medium as TextStyle['fontWeight'],
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 3,
    paddingTop: 7,
    borderTopWidth: 1,
    maxHeight: 50,
    zIndex: 2,
  },
  animationWrapper: {
    width: EFFECT_SIZE,
    height: EFFECT_SIZE / 2,
    position: 'absolute',
    overflow: 'hidden',
    top: -EFFECT_SIZE / 2,
    zIndex: -3,
    borderTopStartRadius: EFFECT_SIZE,
    borderTopEndRadius: EFFECT_SIZE,
  },
  animationContainer: {
    width: EFFECT_SIZE,
    height: EFFECT_SIZE,
    borderRadius: EFFECT_SIZE,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
  },
  animationIcon: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    zIndex: 3,
  },
});
