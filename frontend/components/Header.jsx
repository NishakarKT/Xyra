import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { BORDER_RADIUS, COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const { width } = Dimensions.get('window');

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  // Use default insets since SafeAreaProvider is not available
  const insets = { top: 0, bottom: 0, left: 0, right: 0 };



  const handleSignOut = async () => {
    try {
      await logout();
      setMenuVisible(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const headerStyle = {
    ...styles.header,
    paddingTop: insets.top + 64,
    paddingBottom: insets.bottom + 32,
  };

  return (
    <View style={headerStyle}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo_white_text.png')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>

      {/* Menu Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
        activeOpacity={0.7}
      >
        <FontAwesome name="ellipsis-v" size={18} color={COLORS.text.primary} />
      </TouchableOpacity>

      {/* Menu Popup */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                router.push('/analytics');
                setMenuVisible(false);
              }}
              activeOpacity={0.7}
            >
              <FontAwesome name="bar-chart" size={18} color={COLORS.primary} />
              <Text style={styles.menuText}>Analytics</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                router.push('/settings');
                setMenuVisible(false);
              }}
              activeOpacity={0.7}
            >
              <FontAwesome name="cog" size={18} color={COLORS.primary} />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSignOut}
              activeOpacity={0.7}
            >
              <FontAwesome name="sign-out" size={18} color={COLORS.error} />
              <Text style={styles.menuText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    height: 44,
    ...SHADOWS.sm,
    position: 'relative',
    zIndex: 1000,
    elevation: 4,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
  },
  logo: {
    height: 26,
    width: 90,
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: SPACING.md,
  },
  menuContainer: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    minWidth: 150,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
  },
  menuText: {
    color: COLORS.text.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    marginLeft: SPACING.sm,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
    marginHorizontal: SPACING.sm,
  },
});
