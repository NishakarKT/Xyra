import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SplashScreen } from '../components/SplashScreen';
import { COLORS } from '../constants/theme.js';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Force re-render when user state changes
  useEffect(() => {
    console.log('User state changed, forcing re-render...');
    setForceUpdate(prev => prev + 1);
  }, [user]);

  // Add debugging
  console.log('RootLayoutNav - user:', user, 'isLoading:', isLoading, 'showSplash:', showSplash);

  useEffect(() => {
    let mounted = true;

    const hideSplash = async () => {
      try {
        console.log('Starting splash hide process...');
        // Wait for fonts to load and auth to initialize
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        if (!mounted) return;

        console.log('Hiding native splash screen...');
        // Hide the native splash screen
        await ExpoSplashScreen.hideAsync();

        console.log('Starting fade animation...');
        // Start fade out animation
        console.log('Starting fade animation to opacity 0...');
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          if (mounted) {
            console.log('Fade animation complete, hiding splash...');
            setShowSplash(false);
            console.log('showSplash set to false');
          }
        });
      } catch (error) {
        console.error('Error in splash screen transition:', error);
        if (mounted) {
          setShowSplash(false);
        }
      }
    };

    // Only hide splash after auth loading is complete
    if (!isLoading) {
      console.log('Auth loading complete, starting splash hide...');
      hideSplash();
    } else {
      console.log('Still waiting for auth to load...');
    }

    // Safety fallback - force hide splash after 5 seconds
    const safetyTimeout = setTimeout(() => {
      if (mounted && showSplash) {
        console.log('Safety timeout - forcing splash to hide');
        setShowSplash(false);
      }
    }, 5000);

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
    };
  }, [fadeAnim, isLoading]);

  // Show app content
  console.log('=== RENDER CYCLE ===');
  console.log('showSplash:', showSplash);
  console.log('isLoading:', isLoading);
  console.log('user:', user);
  console.log('user type:', typeof user);
  console.log('user truthy check:', !!user);
  console.log('forceUpdate:', forceUpdate);
  console.log('Will render:', user ? 'TABS (authenticated)' : 'LOGIN (unauthenticated)');
  console.log('=== END RENDER CYCLE ===');
  
  return (
    <SafeAreaProvider>
      <ThemeProvider value={DarkTheme}>
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        {showSplash && (
          <Animated.View 
            style={{
              flex: 1, 
              backgroundColor: COLORS.background,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              opacity: fadeAnim
            }}
          >
            <SplashScreen />
            <StatusBar style="light" />
          </Animated.View>
        )}
        {!showSplash && (
          <>
            {console.log('Rendering app content - user:', user)}
            {isLoading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
                <Text style={{ color: COLORS.text.primary, fontSize: 18 }}>Loading...</Text>
              </View>
            ) : (
              <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                
                
                                 {user ? (
                   // User is logged in - show tabs navigation
                   <Stack key={`auth-${Date.now()}`} screenOptions={{ headerShown: false }}>
                     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                     <Stack.Screen name="chat" options={{ headerShown: false }} />
                   </Stack>
                 ) : (
                   // User is not logged in - show login
                   <Stack key="login-stack" screenOptions={{ headerShown: false }}>
                     <Stack.Screen name="login" options={{ headerShown: false }} />
                     <Stack.Screen name="notFound" options={{ headerShown: false }} />
                   </Stack>
                 )}
              </View>
            )}
          </>
        )}
        <StatusBar style="light" />
      </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
