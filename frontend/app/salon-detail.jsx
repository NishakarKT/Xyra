import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

export default function SalonDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  // Parse the salon data from navigation params
  const salon = params.salon ? JSON.parse(params.salon) : null;

  // If no salon data, show error or redirect
  if (!salon) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Salon information not found</Text>
        <TouchableOpacity style={styles.errorBackButton} onPress={() => router.back()}>
          <Text style={styles.errorBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Available time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'
  ];

  // Available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      display: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  const handleBookAppointment = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      Alert.alert('Missing Information', 'Please select a service, date, and time.');
      return;
    }

    const bookingData = {
      salonId: salon.id,
      salonName: salon.name,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      notes: bookingNotes,
      price: salon.services.find(s => s.name === selectedService)?.price || 0
    };

    // Navigate to booking confirmation
    router.push({
      pathname: '/booking-confirmation',
      params: { preferences: JSON.stringify(bookingData) }
    });
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.serviceItem,
        selectedService === item.name && styles.selectedServiceItem
      ]}
      onPress={() => setSelectedService(item.name)}
    >
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <Text style={styles.serviceDuration}>{item.duration} min</Text>
      </View>
      <View style={styles.servicePriceContainer}>
        <Text style={styles.servicePrice}>₹{item.price}</Text>
        {item.originalPrice && item.originalPrice > item.price && (
          <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.avatar }} style={styles.reviewerAvatar} />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{item.name}</Text>
          <View style={styles.reviewRating}>
            <FontAwesome name="star" size={12} color={COLORS.warning} />
            <Text style={styles.reviewRatingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
      <Text style={styles.reviewText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with back button and message button */}
      <View style={{...styles.header, paddingTop: 48}}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={20} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Salon Details</Text>
        <TouchableOpacity style={styles.messageButton} onPress={() => router.push('/chat')}>
          <FontAwesome name="comment" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Salon Hero Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: salon.avatar }} style={styles.salonImage} />
          <View style={styles.heroOverlay}>
            <View style={styles.salonBasicInfo}>
              <Text style={styles.salonName}>{salon.name}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color={COLORS.warning} />
                <Text style={styles.rating}>{salon.rating}</Text>
                <Text style={styles.reviews}>({salon.reviews} reviews)</Text>
              </View>
              <View style={styles.statusContainer}>
                <View style={[styles.statusIndicator, { backgroundColor: salon.isOpen ? COLORS.success : COLORS.error }]}>
                  <Text style={styles.statusText}>{salon.isOpen ? 'Open' : 'Closed'}</Text>
                </View>
                <Text style={styles.waitTime}>{salon.waitTime}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Salon Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={16} color={COLORS.primary} />
            <Text style={styles.infoText}>{salon.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="phone" size={16} color={COLORS.primary} />
            <Text style={styles.infoText}>+91 98765 43210</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="clock-o" size={16} color={COLORS.primary} />
            <Text style={styles.infoText}>9:00 AM - 8:00 PM (Daily)</Text>
          </View>
        </View>

        {/* Special Offers */}
        {salon.specialOffers.length > 0 && (
          <View style={styles.offersSection}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            <View style={styles.offersContainer}>
              {salon.specialOffers.map((offer, index) => (
                <View key={index} style={styles.offerItem}>
                  <FontAwesome name="gift" size={16} color={COLORS.primary} />
                  <Text style={styles.offerText}>{offer}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Services Section */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Services & Pricing</Text>
          <FlatList
            data={salon.services}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.name}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Booking Section */}
        <View style={styles.bookingSection}>
          <Text style={styles.sectionTitle}>Book Appointment</Text>
          
          {/* Date Selection */}
          <Text style={styles.bookingSubtitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateContainer}>
            {availableDates.map((dateItem) => (
              <TouchableOpacity
                key={dateItem.date}
                style={[
                  styles.dateItem,
                  selectedDate === dateItem.date && styles.selectedDateItem
                ]}
                onPress={() => setSelectedDate(dateItem.date)}
              >
                <Text style={[
                  styles.dateText,
                  selectedDate === dateItem.date && styles.selectedDateText
                ]}>
                  {dateItem.display}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Time Selection */}
          <Text style={styles.bookingSubtitle}>Select Time</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeContainer}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeItem,
                  selectedTime === time && styles.selectedTimeItem
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Additional Notes */}
          <Text style={styles.bookingSubtitle}>Additional Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Any special requests or preferences..."
            placeholderTextColor={COLORS.text.muted}
            value={bookingNotes}
            onChangeText={setBookingNotes}
            multiline
            numberOfLines={3}
          />

          {/* Book Now Button */}
          <TouchableOpacity
            style={[
              styles.bookNowButton,
              (!selectedService || !selectedDate || !selectedTime) && styles.bookNowButtonDisabled
            ]}
            onPress={handleBookAppointment}
            disabled={!selectedService || !selectedDate || !selectedTime}
          >
            <Text style={styles.bookNowButtonText}>Book Now</Text>
            {selectedService && (
              <Text style={styles.bookNowPrice}>
                ₹{salon.services.find(s => s.name === selectedService)?.price || 0}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          <FlatList
            data={[
              {
                id: '1',
                name: 'Priya Sharma',
                avatar: 'https://i.pravatar.cc/150?img=1',
                rating: 5,
                date: '2 days ago',
                text: 'Excellent service! Staff was very professional and the results were amazing. Highly recommended!'
              },
              {
                id: '2',
                name: 'Rajesh Kumar',
                avatar: 'https://i.pravatar.cc/150?img=2',
                rating: 4,
                date: '1 week ago',
                text: 'Great experience overall. The salon is clean and the staff is friendly. Will definitely visit again.'
              },
              {
                id: '3',
                name: 'Meera Patel',
                avatar: 'https://i.pravatar.cc/150?img=3',
                rating: 5,
                date: '2 weeks ago',
                text: 'Best salon in the area! Professional service and reasonable prices. Love the attention to detail.'
              }
            ]}
            renderItem={renderReviewItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginLeft: SPACING.sm,
  },
  backButton: {
    padding: SPACING.sm,
  },
  messageButton: {
    padding: SPACING.sm,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    height: 250,
  },
  salonImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: SPACING.md,
  },
  salonBasicInfo: {
    alignItems: 'flex-start',
  },
  salonName: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.light,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  rating: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.light,
    marginLeft: SPACING.xs,
  },
  reviews: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.light,
    marginLeft: SPACING.xs,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: SPACING.sm,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.light,
    fontWeight: FONTS.weights.bold,
  },
  waitTime: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.light,
  },
  infoSection: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  offersSection: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  offersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    marginRight: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  offerText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
    fontWeight: FONTS.weights.medium,
  },
  servicesSection: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedServiceItem: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.accent,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  serviceDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  serviceDuration: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.muted,
  },
  servicePriceContainer: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.muted,
    textDecorationLine: 'line-through',
  },
  bookingSection: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  bookingSubtitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text.primary,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  dateContainer: {
    marginBottom: SPACING.md,
  },
  dateItem: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    marginRight: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDateItem: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.accent,
  },
  dateText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
    fontWeight: FONTS.weights.medium,
  },
  selectedDateText: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
  },
  timeContainer: {
    marginBottom: SPACING.md,
  },
  timeItem: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    marginRight: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTimeItem: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.accent,
  },
  timeText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
    fontWeight: FONTS.weights.medium,
  },
  selectedTimeText: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    backgroundColor: COLORS.surface,
    textAlignVertical: 'top',
    marginBottom: SPACING.md,
  },
  bookNowButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  bookNowButtonDisabled: {
    backgroundColor: COLORS.text.muted,
  },
  bookNowButtonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.light,
  },
  bookNowPrice: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.light,
    marginTop: SPACING.xs,
  },
  reviewsSection: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  reviewItem: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: 10,
    marginBottom: SPACING.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  reviewDate: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.muted,
  },
  reviewText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  errorBackButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 25,
  },
  errorBackButtonText: {
    color: COLORS.text.light,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
});
