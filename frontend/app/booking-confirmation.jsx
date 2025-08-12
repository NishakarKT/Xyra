import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse preferences from params or use default
  const preferences = params.preferences ? JSON.parse(params.preferences) : {
    service: 'Haircut',
    timePreference: 'Afternoon',
    date: 'Tomorrow'
  };

  const handleConfirmBooking = () => {
    // Here you would typically send the booking to your backend
    console.log('Confirming booking with preferences:', preferences);
    // Show success message and navigate back
    router.back();
  };

  const handleModifyPreferences = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Confirmation</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success Icon */}
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <FontAwesome name="check" size={40} color={COLORS.text.light} />
          </View>
          <Text style={styles.successTitle}>Booking Request Received!</Text>
          <Text style={styles.successSubtitle}>
            Your AI assistant has collected your preferences and is ready to confirm your appointment.
          </Text>
        </View>

        {/* Preferences Summary */}
        <View style={styles.preferencesContainer}>
          <View style={styles.preferencesList}>
            {Object.entries(preferences).map(([key, value]) => (
              <View key={key} style={styles.preferenceItem}>
                <View style={styles.preferenceIcon}>
                  <FontAwesome 
                    name={getPreferenceIcon(key)} 
                    size={16} 
                    color={COLORS.primary} 
                  />
                </View>
                <View style={styles.preferenceContent}>
                  <Text style={styles.preferenceLabel}>{formatPreferenceLabel(key)}</Text>
                  <Text style={styles.preferenceValue}>{value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.nextStepsContainer}>
          <Text style={styles.sectionTitle}>What Happens Next?</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Review & Confirm</Text>
                <Text style={styles.stepDescription}>
                  Review your preferences and confirm the booking
                </Text>
              </View>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Slot Assignment</Text>
                <Text style={styles.stepDescription}>
                  We'll assign the best available slot based on your preferences
                </Text>
              </View>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Confirmation</Text>
                <Text style={styles.stepDescription}>
                  Receive confirmation with appointment details and reminders
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Estimated Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={styles.sectionTitle}>Estimated Timeline</Text>
          <View style={styles.timelineItem}>
            <FontAwesome name="clock-o" size={16} color={COLORS.primary} />
            <Text style={styles.timelineText}>
              Booking confirmation within 2 hours
            </Text>
          </View>
          <View style={styles.timelineItem}>
            <FontAwesome name="calendar" size={16} color={COLORS.primary} />
            <Text style={styles.timelineText}>
              Appointment scheduled within 24 hours
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.modifyButton} 
          onPress={handleModifyPreferences}
        >
          <Text style={styles.modifyButtonText}>Modify Preferences</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getPreferenceIcon = (key) => {
  const iconMap = {
    service: 'cut',
    timePreference: 'clock-o',
    date: 'calendar',
    stylist: 'user',
    location: 'map-marker',
    duration: 'hourglass-half'
  };
  return iconMap[key] || 'info-circle';
};

const formatPreferenceLabel = (key) => {
  const labelMap = {
    service: 'Service Type',
    timePreference: 'Preferred Time',
    date: 'Preferred Date',
    stylist: 'Stylist Preference',
    location: 'Location',
    duration: 'Duration'
  };
  return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    paddingTop: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  backButton: {
    padding: SPACING.xs,
    marginRight: SPACING.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  successContainer: {
    alignItems: 'center',
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.lg,
  },
  successTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  preferencesContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  preferencesList: {
    gap: SPACING.sm,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  preferenceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  preferenceContent: {
    flex: 1,
  },
  preferenceLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  preferenceValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text.primary,
  },
  nextStepsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepsList: {
    gap: SPACING.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  stepNumberText: {
    color: COLORS.text.light,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  timelineContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  timelineText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    marginLeft: SPACING.sm,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  modifyButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifyButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text.primary,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: COLORS.success,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text.light,
  },
});
