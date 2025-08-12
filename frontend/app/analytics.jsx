import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme.js';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  const analyticsTabs = [
    { id: 'overview', title: 'Overview', icon: 'dashboard' },
    { id: 'bookings', title: 'Bookings', icon: 'calendar-check-o' },
    { id: 'revenue', title: 'Revenue', icon: 'money' },
    { id: 'services', title: 'Services', icon: 'cut' },
    { id: 'customers', title: 'Customers', icon: 'users' },
    { id: 'ratings', title: 'Ratings', icon: 'star' },
    { id: 'trends', title: 'Trends', icon: 'line-chart' },
  ];

  const renderOverviewContent = () => (
    <View style={styles.contentContainer}>
      {/* Key Metrics Cards */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <FontAwesome name="calendar-check-o" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.metricValue}>156</Text>
          <Text style={styles.metricLabel}>Total Bookings</Text>
          <Text style={styles.metricChange}>+12% vs last month</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <FontAwesome name="money" size={24} color={COLORS.success} />
          </View>
          <Text style={styles.metricValue}>$8,450</Text>
          <Text style={styles.metricLabel}>Total Revenue</Text>
          <Text style={styles.metricChange}>+8% vs last month</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <FontAwesome name="users" size={24} color={COLORS.warning} />
          </View>
          <Text style={styles.metricValue}>89</Text>
          <Text style={styles.metricLabel}>New Customers</Text>
          <Text style={styles.metricChange}>+15% vs last month</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <FontAwesome name="star" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.metricValue}>4.7</Text>
          <Text style={styles.metricLabel}>Avg Rating</Text>
          <Text style={styles.metricChange}>+0.2 vs last month</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <FontAwesome name="calendar-plus-o" size={16} color={COLORS.success} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>New booking: Hair Cut & Styling</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <FontAwesome name="star" size={16} color={COLORS.warning} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>5-star review received</Text>
              <Text style={styles.activityTime}>4 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <FontAwesome name="user-plus" size={16} color={COLORS.primary} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>New customer registered</Text>
              <Text style={styles.activityTime}>6 hours ago</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderBookingsContent = () => (
    <View style={styles.contentContainer}>
      {/* Booking Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Total Bookings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>142</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>14</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Popular Time Slots */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Popular Time Slots</Text>
        <View style={styles.timeSlotList}>
          <View style={styles.timeSlotItem}>
            <Text style={styles.timeSlot}>10:00 AM</Text>
            <View style={styles.timeSlotBar}>
              <View style={[styles.timeSlotFill, { width: '75%' }]} />
            </View>
            <Text style={styles.timeSlotCount}>75%</Text>
          </View>
          <View style={styles.timeSlotItem}>
            <Text style={styles.timeSlot}>2:00 PM</Text>
            <View style={styles.timeSlotBar}>
              <View style={[styles.timeSlotFill, { width: '60%' }]} />
            </View>
            <Text style={styles.timeSlotCount}>60%</Text>
          </View>
          <View style={styles.timeSlotItem}>
            <Text style={styles.timeSlot}>4:00 PM</Text>
            <View style={styles.timeSlotBar}>
              <View style={[styles.timeSlotFill, { width: '45%' }]} />
            </View>
            <Text style={styles.timeSlotCount}>45%</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderRevenueContent = () => (
    <View style={styles.contentContainer}>
      {/* Revenue Overview */}
      <View style={styles.revenueCard}>
        <Text style={styles.revenueTitle}>Monthly Revenue</Text>
        <Text style={styles.revenueAmount}>$8,450</Text>
        <Text style={styles.revenueChange}>+8% from last month</Text>
      </View>

      {/* Revenue Breakdown */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Revenue by Service</Text>
        <View style={styles.revenueBreakdown}>
          <View style={styles.revenueItem}>
            <View style={styles.revenueItemHeader}>
              <Text style={styles.revenueService}>Hair Services</Text>
              <Text style={styles.revenueServiceAmount}>$3,200</Text>
            </View>
            <View style={styles.revenueBar}>
              <View style={[styles.revenueBarFill, { width: '38%' }]} />
            </View>
          </View>
          <View style={styles.revenueItem}>
            <View style={styles.revenueItemHeader}>
              <Text style={styles.revenueService}>Facial Treatments</Text>
              <Text style={styles.revenueServiceAmount}>$2,150</Text>
            </View>
            <View style={styles.revenueBar}>
              <View style={[styles.revenueBarFill, { width: '25%' }]} />
            </View>
          </View>
          <View style={styles.revenueItem}>
            <View style={styles.revenueItemHeader}>
              <Text style={styles.revenueService}>Nail Services</Text>
              <Text style={styles.revenueServiceAmount}>$1,800</Text>
            </View>
            <View style={styles.revenueBar}>
              <View style={[styles.revenueBarFill, { width: '21%' }]} />
            </View>
          </View>
          <View style={styles.revenueItem}>
            <View style={styles.revenueItemHeader}>
              <Text style={styles.revenueService}>Other Services</Text>
              <Text style={styles.revenueServiceAmount}>$1,300</Text>
            </View>
            <View style={styles.revenueBar}>
              <View style={[styles.revenueBarFill, { width: '15%' }]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderServicesContent = () => (
    <View style={styles.contentContainer}>
      {/* Service Performance */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Top Performing Services</Text>
        <View style={styles.serviceList}>
          <View style={styles.serviceItem}>
            <View style={styles.serviceIcon}>
              <FontAwesome name="cut" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>Hair Cut & Styling</Text>
              <Text style={styles.serviceStats}>45 bookings • $1,800 revenue</Text>
            </View>
            <View style={styles.serviceRating}>
              <FontAwesome name="star" size={14} color={COLORS.warning} />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>
          <View style={styles.serviceItem}>
            <View style={styles.serviceIcon}>
              <FontAwesome name="spa" size={20} color={COLORS.success} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>Facial Treatment</Text>
              <Text style={styles.serviceStats}>32 bookings • $1,600 revenue</Text>
            </View>
            <View style={styles.serviceRating}>
              <FontAwesome name="star" size={14} color={COLORS.warning} />
              <Text style={styles.ratingText}>4.7</Text>
            </View>
          </View>
          <View style={styles.serviceItem}>
            <View style={styles.serviceIcon}>
              <FontAwesome name="hand-paper-o" size={20} color={COLORS.warning} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>Manicure & Pedicure</Text>
              <Text style={styles.serviceStats}>28 bookings • $1,400 revenue</Text>
            </View>
            <View style={styles.serviceRating}>
              <FontAwesome name="star" size={14} color={COLORS.warning} />
              <Text style={styles.ratingText}>4.6</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCustomersContent = () => (
    <View style={styles.contentContainer}>
      {/* Customer Demographics */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Customer Demographics</Text>
        <View style={styles.demographicsGrid}>
          <View style={styles.demographicCard}>
            <Text style={styles.demographicTitle}>Age Groups</Text>
            <View style={styles.demographicItem}>
              <Text style={styles.demographicLabel}>18-25</Text>
              <Text style={styles.demographicValue}>35%</Text>
            </View>
            <View style={styles.demographicItem}>
              <Text style={styles.demographicLabel}>26-35</Text>
              <Text style={styles.demographicValue}>42%</Text>
            </View>
            <View style={styles.demographicItem}>
              <Text style={styles.demographicLabel}>36-45</Text>
              <Text style={styles.demographicValue}>18%</Text>
            </View>
            <View style={styles.demographicItem}>
              <Text style={styles.demographicLabel}>45+</Text>
              <Text style={styles.demographicValue}>5%</Text>
            </View>
          </View>
          <View style={styles.demographicCard}>
            <Text style={styles.demographicTitle}>Gender</Text>
            <View style={styles.demographicItem}>
              <Text style={styles.demographicLabel}>Female</Text>
              <Text style={styles.demographicValue}>78%</Text>
            </View>
            <View style={styles.demographicItem}>
              <Text style={styles.demographicLabel}>Male</Text>
              <Text style={styles.demographicValue}>22%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Customer Loyalty */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Customer Loyalty</Text>
        <View style={styles.loyaltyStats}>
          <View style={styles.loyaltyItem}>
            <Text style={styles.loyaltyNumber}>156</Text>
            <Text style={styles.loyaltyLabel}>Total Customers</Text>
          </View>
          <View style={styles.loyaltyItem}>
            <Text style={styles.loyaltyNumber}>89</Text>
            <Text style={styles.loyaltyLabel}>New This Month</Text>
          </View>
          <View style={styles.loyaltyItem}>
            <Text style={styles.loyaltyNumber}>67</Text>
            <Text style={styles.loyaltyLabel}>Returning</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderRatingsContent = () => (
    <View style={styles.contentContainer}>
      {/* Overall Rating */}
      <View style={styles.ratingOverview}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingNumber}>4.7</Text>
          <Text style={styles.ratingLabel}>Average</Text>
        </View>
        <View style={styles.ratingBreakdown}>
          <View style={styles.ratingBar}>
            <Text style={styles.ratingStar}>5★</Text>
            <View style={styles.ratingBarContainer}>
              <View style={[styles.ratingBarFill, { width: '65%' }]} />
            </View>
            <Text style={styles.ratingCount}>65%</Text>
          </View>
          <View style={styles.ratingBar}>
            <Text style={styles.ratingStar}>4★</Text>
            <View style={styles.ratingBarContainer}>
              <View style={[styles.ratingBarFill, { width: '25%' }]} />
            </View>
            <Text style={styles.ratingCount}>25%</Text>
          </View>
          <View style={styles.ratingBar}>
            <Text style={styles.ratingStar}>3★</Text>
            <View style={styles.ratingBarContainer}>
              <View style={[styles.ratingBarFill, { width: '8%' }]} />
            </View>
            <Text style={styles.ratingCount}>8%</Text>
          </View>
          <View style={styles.ratingBar}>
            <Text style={styles.ratingStar}>2★</Text>
            <View style={styles.ratingBarContainer}>
              <View style={[styles.ratingBarFill, { width: '2%' }]} />
            </View>
            <Text style={styles.ratingCount}>2%</Text>
          </View>
        </View>
      </View>

      {/* Recent Reviews */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Reviews</Text>
        <View style={styles.reviewList}>
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Priya Sharma</Text>
              <View style={styles.reviewStars}>
                <FontAwesome name="star" size={12} color={COLORS.warning} />
                <FontAwesome name="star" size={12} color={COLORS.warning} />
                <FontAwesome name="star" size={12} color={COLORS.warning} />
                <FontAwesome name="star" size={12} color={COLORS.warning} />
                <FontAwesome name="star" size={12} color={COLORS.warning} />
              </View>
            </View>
            <Text style={styles.reviewText}>Excellent service! Very professional and friendly staff.</Text>
            <Text style={styles.reviewDate}>2 days ago</Text>
          </View>
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Rajesh Kumar</Text>
              <View style={styles.reviewStars}>
                <FontAwesome name="star" size={12} color={COLORS.warning} />
                <FontAwesome name="star" size={12} color={COLORS.warning} />
                <FontAwesome name="star" size={12} color={COLORS.warning} />
                <FontAwesome name="star" size={12} color={COLORS.warning} />
                <FontAwesome name="star-o" size={12} color={COLORS.text.secondary} />
              </View>
            </View>
            <Text style={styles.reviewText}>Great haircut and styling. Will definitely come back!</Text>
            <Text style={styles.reviewDate}>3 days ago</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTrendsContent = () => (
    <View style={styles.contentContainer}>
      {/* Trend Indicators */}
      <View style={styles.trendsGrid}>
        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>Booking Growth</Text>
          <View style={styles.trendValue}>
            <FontAwesome name="arrow-up" size={16} color={COLORS.success} />
            <Text style={styles.trendNumber}>+12%</Text>
          </View>
          <Text style={styles.trendPeriod}>vs last month</Text>
        </View>
        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>Revenue Growth</Text>
          <View style={styles.trendValue}>
            <FontAwesome name="arrow-up" size={16} color={COLORS.success} />
            <Text style={styles.trendNumber}>+8%</Text>
          </View>
          <Text style={styles.trendPeriod}>vs last month</Text>
        </View>
        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>Customer Growth</Text>
          <View style={styles.trendValue}>
            <FontAwesome name="arrow-up" size={16} color={COLORS.success} />
            <Text style={styles.trendNumber}>+15%</Text>
          </View>
          <Text style={styles.trendPeriod}>vs last month</Text>
        </View>
        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>Rating Change</Text>
          <View style={styles.trendValue}>
            <FontAwesome name="arrow-up" size={16} color={COLORS.success} />
            <Text style={styles.trendNumber}>+0.2</Text>
          </View>
          <Text style={styles.trendPeriod}>vs last month</Text>
        </View>
      </View>

      {/* Seasonal Trends */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Seasonal Trends</Text>
        <View style={styles.seasonalTrends}>
          <View style={styles.seasonalItem}>
            <Text style={styles.seasonalMonth}>Jan</Text>
            <View style={styles.seasonalBar}>
              <View style={[styles.seasonalBarFill, { height: '60%' }]} />
            </View>
          </View>
          <View style={styles.seasonalItem}>
            <Text style={styles.seasonalMonth}>Feb</Text>
            <View style={styles.seasonalBar}>
              <View style={[styles.seasonalBarFill, { height: '70%' }]} />
            </View>
          </View>
          <View style={styles.seasonalItem}>
            <Text style={styles.seasonalMonth}>Mar</Text>
            <View style={styles.seasonalBar}>
              <View style={[styles.seasonalBarFill, { height: '80%' }]} />
            </View>
          </View>
          <View style={styles.seasonalItem}>
            <Text style={styles.seasonalMonth}>Apr</Text>
            <View style={styles.seasonalBar}>
              <View style={[styles.seasonalBarFill, { height: '90%' }]} />
            </View>
          </View>
          <View style={styles.seasonalItem}>
            <Text style={styles.seasonalMonth}>May</Text>
            <View style={styles.seasonalBar}>
              <View style={[styles.seasonalBarFill, { height: '85%' }]} />
            </View>
          </View>
          <View style={styles.seasonalItem}>
            <Text style={styles.seasonalMonth}>Jun</Text>
            <View style={styles.seasonalBar}>
              <View style={[styles.seasonalBarFill, { height: '95%' }]} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const getContentByTab = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewContent();
      case 'bookings':
        return renderBookingsContent();
      case 'revenue':
        return renderRevenueContent();
      case 'services':
        return renderServicesContent();
      case 'customers':
        return renderCustomersContent();
      case 'ratings':
        return renderRatingsContent();
      case 'trends':
        return renderTrendsContent();
      default:
        return renderOverviewContent();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <FontAwesome name="arrow-left" size={20} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Scrollable Tab Navigation */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{...styles.tabScrollContainer, marginTop: SPACING.md}}
        contentContainerStyle={styles.tabScrollContent}
      >
        {analyticsTabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <FontAwesome
              name={tab.icon}
              size={16}
              color={activeTab === tab.id ? COLORS.primary : COLORS.text.secondary}
            />
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
        {getContentByTab()}
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
    paddingTop: 60,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  tabScrollContainer: {
    maxHeight: 60,
  },
  tabScrollContent: {
    paddingHorizontal: SPACING.md,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    minWidth: 100,
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.primary + '15',
  },
  tabText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  metricCard: {
    width: (width - SPACING.md * 3) / 2,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  metricValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  metricLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  metricChange: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.success,
    fontWeight: FONTS.weights.semibold,
  },
  sectionContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  activityList: {
    gap: SPACING.sm,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 12,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  timeSlotList: {
    gap: SPACING.sm,
  },
  timeSlotItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSlot: {
    width: 80,
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
  },
  timeSlotBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginHorizontal: SPACING.sm,
  },
  timeSlotFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  timeSlotCount: {
    width: 40,
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    textAlign: 'right',
  },
  revenueCard: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  revenueTitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  revenueAmount: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  revenueChange: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white + 'CC',
  },
  revenueBreakdown: {
    gap: SPACING.md,
  },
  revenueItem: {
    marginBottom: SPACING.sm,
  },
  revenueItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  revenueService: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
  },
  revenueServiceAmount: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
  },
  revenueBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
  },
  revenueBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  serviceList: {
    gap: SPACING.md,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  serviceStats: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
  },
  serviceRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginLeft: SPACING.xs,
  },
  demographicsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  demographicCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
  },
  demographicTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  demographicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  demographicLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
  },
  demographicValue: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
  },
  loyaltyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loyaltyItem: {
    alignItems: 'center',
  },
  loyaltyNumber: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  loyaltyLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  ratingCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  ratingNumber: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.white,
  },
  ratingLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.white + 'CC',
  },
  ratingBreakdown: {
    flex: 1,
    gap: SPACING.sm,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    width: 30,
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
  },
  ratingBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginHorizontal: SPACING.sm,
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: COLORS.warning,
    borderRadius: 4,
  },
  ratingCount: {
    width: 40,
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    textAlign: 'right',
  },
  reviewList: {
    gap: SPACING.md,
  },
  reviewItem: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  reviewerName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
    color: COLORS.text.primary,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  reviewDate: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.secondary,
  },
  trendsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  trendCard: {
    width: (width - SPACING.md * 3) / 2,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendTitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  trendValue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  trendNumber: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.success,
    marginLeft: SPACING.xs,
  },
  trendPeriod: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  seasonalTrends: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  seasonalItem: {
    alignItems: 'center',
  },
  seasonalMonth: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  seasonalBar: {
    width: 20,
    height: 80,
    backgroundColor: COLORS.border,
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  seasonalBarFill: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
});
