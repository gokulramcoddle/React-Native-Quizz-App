
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CircularMovingBorder() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.borderWrapper, { transform: [{ rotate }] }]}>
        <LinearGradient
          colors={['red', 'blue']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        />
      </Animated.View>

      <View style={styles.innerCircle}>
        <Text style={styles.text}>🌈</Text>
      </View>
    </View>
  );
}

const SIZE = 140;
const BORDER_WIDTH = 6;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#111',
  },
  borderWrapper: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: SIZE / 2,
    padding: BORDER_WIDTH,
  },
  innerCircle: {
    width: SIZE - BORDER_WIDTH * 2,
    height: SIZE - BORDER_WIDTH * 2,
    borderRadius: (SIZE - BORDER_WIDTH * 2) / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  text: {
    fontSize: 32,
  },
});
