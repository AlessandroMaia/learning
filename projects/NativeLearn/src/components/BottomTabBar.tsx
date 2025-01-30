import { theme } from '@constants/theme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useThemeColor } from '@hooks/useThemeColor';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { DrawerActions } from '@react-navigation/native';
import React, { ReactNode, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';
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
const PADDING_HORIZONTAL = 10;

export function BottomTabBar({
  descriptors,
  navigation,
  state,
}: BottomTabBarProps) {
  const TabCount = state.routes.length + 1;
  const focusedTab = state.index;

  const translateX = useSharedValue(0);
  const TabWidth =
    (width - GAP - PADDING_HORIZONTAL * 2 * (TabCount - 1)) / TabCount;
  const backgroundColor = useThemeColor({ color: 'background' });
  const foregroundColor = useThemeColor({ color: 'foreground' });
  const borderColor = useThemeColor({ color: 'border' });
  const primaryColor = useThemeColor({ color: 'primary' });

  useEffect(() => {
    runOnUI((index: number) => {
      translateX.value = withSpring(
        index * (TabWidth + GAP) +
          TabWidth / 2 -
          EFFECT_SIZE / 2 +
          PADDING_HORIZONTAL
      , {
        damping: 12
      });
    })(focusedTab);
  }, [focusedTab]);

  const CustomButton = ({
    label,
    icon,
    ...props
  }: TouchableOpacityProps & { label: string; icon?: ReactNode }) => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: TabWidth,
          },
        ]}
        {...props}
      >
        {icon}
        <Text
          style={{
            fontWeight: theme.font.medium as TextStyle['fontWeight'],
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor,
          borderColor,
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
              borderColor,
            },
          ]}
        >
          <View
            style={[
              styles.animationIcon,
              {
                backgroundColor: foregroundColor,
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
          <CustomButton
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            label={label}
            icon={
              options.tabBarIcon &&
              options.tabBarIcon({
                focused: true,
                color: isFocused ? primaryColor : borderColor,
                size: ICON_SIZE,
              })
            }
          />
        );
      })}

      <CustomButton
        style={[
          styles.button,
          {
            width: TabWidth,
          },
        ]}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        label={'Menu'}
        icon={<FontAwesome5  size={ICON_SIZE} name="th" color={borderColor} />}
      />
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
    maxHeight: 54,
    zIndex: 2,
    paddingHorizontal: PADDING_HORIZONTAL,
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
