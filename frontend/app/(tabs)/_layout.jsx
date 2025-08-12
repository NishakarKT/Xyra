import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Header from '../../components/Header';
import { COLORS } from '../../constants/theme.js';
import { useAuth } from '../../contexts/AuthContext';

export default function TabLayout() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Safety check to ensure user data is valid
  if (!user || typeof user !== 'object') {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.text.tertiary,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopColor: COLORS.border,
            shadowColor: COLORS.shadow,
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 8,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="assistant"
          options={{
            title: 'Assistant',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="robot" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Chats',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="comments" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: 'Discover',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="posts"
          options={{
            title: 'Posts',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="newspaper-o" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Bookings',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="calendar-check-o" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
