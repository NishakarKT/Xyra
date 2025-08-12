import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/theme.js';

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: 'transparent',
  },
  logoImage: {
    width: 120,
    height: 120,
  },
});
