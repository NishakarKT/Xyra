import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme.js';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const TEST_OTP = '123456';

  const handleSendOtp = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpInput(true);
      Alert.alert('Success', 'Verification code sent to your phone');
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    if (otp !== TEST_OTP) {
      Alert.alert('Error', 'Invalid verification code. Please try again.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API delay
      setTimeout(async () => {
        const dummyUser = {
          id: '1',
          name: 'Test User',
          role: 'user'
        };
        const dummyToken = 'dummy_token_123';

        await login(dummyToken, dummyUser);
        // Let the layout handle navigation based on user state change
      }, 1000);
    } catch (_error) {
      Alert.alert('Error', 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    setOtp('');
    setShowOtpInput(false);
    Alert.alert('Success', 'New verification code sent');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand Section */}
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Xyra</Text>
          <Text style={styles.subtitle}>Right Look. Right Now.</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {!showOtpInput ? (
            <View style={styles.phoneInputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.text.muted}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSendOtp}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Sending...' : 'Send Verification Code'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.otpInputContainer}>
              <Text style={styles.label}>Verification Code</Text>
              <Text style={styles.otpInfo}>
                Enter the 6-digit code sent to {phoneNumber}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 6-digit code"
                placeholderTextColor={COLORS.text.muted}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleVerifyOtp}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResendOtp}
              >
                <Text style={styles.resendText}>Resend Code</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  brandSection: {
    alignItems: 'center',
    paddingTop: SPACING.xxl * 2,
    paddingBottom: SPACING.xl,
  },
  logoContainer: {
    marginBottom: SPACING.lg,
    backgroundColor: 'transparent',
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  formSection: {
    paddingHorizontal: SPACING.xl,
    minHeight: 300,
  },
  phoneInputContainer: {
    marginBottom: SPACING.lg,
  },
  otpInputContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  otpInfo: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.text.light,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },
  resendButton: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  resendText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
  },
  footerSection: {
    paddingHorizontal: SPACING.xl,
    marginTop: 40,
  },
  footerText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
