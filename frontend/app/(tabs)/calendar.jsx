import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AgentChatbox from '../../components/AgentChatbox';
import { COLORS, FONTS, SPACING } from '../../constants/theme.js';

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [agentChatboxVisible, setAgentChatboxVisible] = useState(false);

  // Sample bookings data - in real app, this would come from API
  useEffect(() => {
    const sampleBookings = [
      {
        id: '1',
        date: new Date(2024, 11, 15),
        time: '10:00 AM',
        service: 'Hair Cut & Styling',
        salon: 'Glamour Salon & Spa',
        salonImage: 'https://i.pravatar.cc/150?img=1',
        duration: '1 hour',
        status: 'confirmed',
        price: '$45',
        type: 'upcoming',
        rating: 4.8,
        reviews: 127,
        address: 'MG Road, Near Central Mall'
      },
      {
        id: '2',
        date: new Date(2024, 11, 18),
        time: '2:30 PM',
        service: 'Facial Treatment',
        salon: 'Beauty Zone',
        salonImage: 'https://i.pravatar.cc/150?img=2',
        duration: '1.5 hours',
        status: 'confirmed',
        price: '$65',
        type: 'upcoming',
        rating: 4.6,
        reviews: 89,
        address: 'Beauty Lane, Shop No. 5'
      },
      {
        id: '3',
        date: new Date(2024, 11, 22),
        time: '11:00 AM',
        service: 'Manicure & Pedicure',
        salon: 'Style Studio',
        salonImage: 'https://i.pravatar.cc/150?img=3',
        duration: '2 hours',
        status: 'pending',
        price: '$35',
        type: 'upcoming',
        rating: 4.7,
        reviews: 156,
        address: 'Residential Area, Near Park'
      },
      {
        id: '4',
        date: new Date(2024, 10, 25),
        time: '4:00 PM',
        service: 'Hair Color',
        salon: 'Glamour Salon & Spa',
        salonImage: 'https://i.pravatar.cc/150?img=1',
        duration: '3 hours',
        status: 'completed',
        price: '$120',
        type: 'past',
        rating: 4.8,
        reviews: 127,
        address: 'MG Road, Near Central Mall'
      },
      {
        id: '5',
        date: new Date(2024, 10, 20),
        time: '1:00 PM',
        service: 'Bridal Makeup',
        salon: 'Beauty Zone',
        salonImage: 'https://i.pravatar.cc/150?img=2',
        duration: '2.5 hours',
        status: 'completed',
        price: '$150',
        type: 'past',
        rating: 4.6,
        reviews: 89,
        address: 'Beauty Lane, Shop No. 5'
      },
      {
        id: '6',
        date: new Date(2024, 10, 15),
        time: '9:00 AM',
        service: 'Hair Treatment',
        salon: 'Style Studio',
        salonImage: 'https://i.pravatar.cc/150?img=3',
        duration: '2 hours',
        status: 'completed',
        price: '$80',
        type: 'past',
        rating: 4.7,
        reviews: 156,
        address: 'Residential Area, Near Park'
      }
    ];
    setBookings(sampleBookings);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
      case 'completed':
        return COLORS.primary;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.text.secondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'check-circle';
      case 'pending':
        return 'clock-o';
      case 'completed':
        return 'check-square-o';
      case 'cancelled':
        return 'times-circle';
      default:
        return 'question-circle';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const cancelBooking = (bookingId) => {
    // In real app, show confirmation dialog
    console.log('Cancelling booking:', bookingId);
  };

  const rescheduleBooking = (bookingId) => {
    // In real app, navigate to reschedule screen
    console.log('Rescheduling booking:', bookingId);
  };

  const rebookService = (bookingId) => {
    // In real app, navigate to booking screen
    console.log('Rebooking service:', bookingId);
  };

  const leaveReview = (bookingId) => {
    // In real app, navigate to review screen
    console.log('Leaving review for:', bookingId);
  };

  const getFilteredBookings = () => {
    return bookings.filter(booking => {
      if (activeTab === 'upcoming') {
        return ['confirmed', 'pending'].includes(booking.status);
      } else {
        return ['completed', 'cancelled'].includes(booking.status);
      }
    });
  };

  const filteredBookings = getFilteredBookings();

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Image source={{ uri: item.salonImage }} style={styles.avatar} />
      <View style={styles.bookingInfo}>
        <View style={styles.bookingHeader}>
          <Text style={styles.salonName}>{item.salon}</Text>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]}>
            <FontAwesome name={getStatusIcon(item.status)} size={10} color={COLORS.text.light} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        
        <Text style={styles.serviceName}>{item.service}</Text>
        
        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={12} color={COLORS.warning} />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews} reviews)</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <FontAwesome name="calendar-o" size={12} color={COLORS.text.secondary} />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <FontAwesome name="clock-o" size={12} color={COLORS.text.secondary} />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <FontAwesome name="hourglass-half" size={12} color={COLORS.text.secondary} />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
        </View>

        <Text style={styles.address}>{item.address}</Text>

        {/* Action Buttons */}
        {activeTab === 'upcoming' && (
          <View style={styles.actionButtons}>
            {item.status === 'confirmed' && (
              <>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => rescheduleBooking(item.id)}
                >
                  <FontAwesome name="calendar-plus-o" size={12} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>Reschedule</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => cancelBooking(item.id)}
                >
                  <FontAwesome name="times" size={12} color={COLORS.error} />
                  <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
            
            {item.status === 'pending' && (
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => cancelBooking(item.id)}
              >
                <FontAwesome name="times" size={12} color={COLORS.error} />
                <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {activeTab === 'past' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => rebookService(item.id)}
            >
              <FontAwesome name="refresh" size={12} color={COLORS.primary} />
              <Text style={styles.actionButtonText}>Book Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => leaveReview(item.id)}
            >
              <FontAwesome name="star-o" size={12} color={COLORS.warning} />
              <Text style={styles.actionButtonText}>Leave Review</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome 
        name={activeTab === 'upcoming' ? 'calendar-o' : 'history'} 
        size={48} 
        color={COLORS.text.secondary} 
      />
      <Text style={styles.emptyText}>
        {activeTab === 'upcoming' ? 'No upcoming bookings' : 'No past bookings'}
      </Text>
      <Text style={styles.emptySubtext}>
        {activeTab === 'upcoming' ? 'Book your next appointment' : 'Your completed appointments will appear here'}
      </Text>
    </View>
  );

  const handleOpenAgentChatbox = () => {
    setAgentChatboxVisible(true);
  };

  const handleCloseAgentChatbox = () => {
    setAgentChatboxVisible(false);
  };

  const handleBookAppointment = (salonName) => {
    // Handle booking appointment
    Alert.alert('Booking', `Booking appointment for ${salonName}`);
    setAgentChatboxVisible(false);
  };

  return (
    <View style={styles.container}>

      {/* Tab Navigation */}
      <View style={{...styles.tabContainer, marginTop: SPACING.md}}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <FontAwesome 
            name="calendar" 
            size={16} 
            color={activeTab === 'upcoming' ? COLORS.primary : COLORS.text.secondary} 
          />
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <FontAwesome 
            name="history" 
            size={16} 
            color={activeTab === 'past' ? COLORS.primary : COLORS.text.secondary} 
          />
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        style={styles.bookingsList}
      />

      {/* Agent FAB */}
      <TouchableOpacity style={styles.fab} onPress={handleOpenAgentChatbox}>
        <Image 
          source={require('../../assets/images/Nyra.avif')}
          style={styles.fabImage}
        />
      </TouchableOpacity>

      {/* AI Agent Chatbox */}
      <AgentChatbox
        visible={agentChatboxVisible}
        onClose={handleCloseAgentChatbox}
        onBookAppointment={handleBookAppointment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.md,
    paddingTop: SPACING.xl,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 10,
    padding: SPACING.xs,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary + '15',
  },
  tabText: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  bookingsList: {
    flex: 1,
  },
  bookingItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    paddingRight: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SPACING.md,
  },
  bookingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  salonName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    flex: 1,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.light,
    fontWeight: FONTS.weights.bold,
    marginLeft: SPACING.xs,
    textTransform: 'capitalize',
  },
  serviceName: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginLeft: SPACING.xs,
  },
  reviews: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  priceContainer: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priceText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  detailText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  address: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
    backgroundColor: COLORS.accent,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  actionButtonText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    fontWeight: FONTS.weights.semibold,
    marginLeft: SPACING.xs,
  },
  cancelButton: {
    backgroundColor: COLORS.error + '15',
    borderColor: COLORS.error + '30',
  },
  cancelButtonText: {
    color: COLORS.error,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    backgroundColor: COLORS.text.light,
    width: 64,
    height: 64,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabImage: {
    width: 64, // Increased from 40 to 56
    height: 64, // Increased from 40 to 56
    borderRadius: 40,
  },
});
