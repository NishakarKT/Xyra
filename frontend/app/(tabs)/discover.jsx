import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../../constants/theme.js';
import AgentChatbox from '../../components/AgentChatbox';

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [agentChatboxVisible, setAgentChatboxVisible] = useState(false);
  const router = useRouter();
  
  // Dummy nearby salons data
  const nearbySalons = [
    {
      id: '1',
      name: 'Glamour Salon & Spa',
      owner: 'Priya Sharma',
      distance: '0.2 km',
      rating: 4.8,
      reviews: 127,
      services: [
        {
          name: 'Hair Cut',
          description: 'Professional haircut with styling',
          price: 800,
          originalPrice: 1000,
          duration: 45
        },
        {
          name: 'Facial',
          description: 'Deep cleansing facial with mask',
          price: 1200,
          originalPrice: 1500,
          duration: 60
        },
        {
          name: 'Manicure',
          description: 'Classic manicure with nail art',
          price: 600,
          originalPrice: 750,
          duration: 30
        },
        {
          name: 'Pedicure',
          description: 'Relaxing pedicure treatment',
          price: 800,
          originalPrice: 1000,
          duration: 45
        }
      ],
      priceRange: '₹₹',
      isOpen: true,
      waitTime: '15 min',
      avatar: 'https://i.pravatar.cc/150?img=1',
      address: 'MG Road, Near Central Mall',
      specialOffers: ['20% off on first visit', 'Free consultation'],
    },
    {
      id: '2',
      name: 'Beauty Zone',
      owner: 'Rajesh Kumar',
      distance: '0.5 km',
      rating: 4.6,
      reviews: 89,
      services: [
        {
          name: 'Hair Styling',
          description: 'Trendy hair styling and blow dry',
          price: 1000,
          originalPrice: 1200,
          duration: 60
        },
        {
          name: 'Beard Trim',
          description: 'Professional beard trimming and shaping',
          price: 400,
          originalPrice: 500,
          duration: 25
        },
        {
          name: 'Hair Color',
          description: 'Professional hair coloring service',
          price: 2500,
          originalPrice: 3000,
          duration: 90
        },
        {
          name: 'Hair Treatment',
          description: 'Deep conditioning hair treatment',
          price: 1500,
          originalPrice: 1800,
          duration: 75
        }
      ],
      priceRange: '₹₹₹',
      isOpen: true,
      waitTime: '25 min',
      avatar: 'https://i.pravatar.cc/150?img=2',
      address: 'Park Street, Behind City Center',
      specialOffers: ['Student discount 15%', 'Package deals available'],
    },
    {
      id: '3',
      name: 'Luxe Hair Studio',
      owner: 'Meera Patel',
      distance: '0.8 km',
      rating: 4.9,
      reviews: 203,
      services: [
        {
          name: 'Hair Treatment',
          description: 'Premium hair treatment with keratin',
          price: 3500,
          originalPrice: 4000,
          duration: 120
        },
        {
          name: 'Bridal Makeup',
          description: 'Complete bridal makeup package',
          price: 8000,
          originalPrice: 10000,
          duration: 180
        },
        {
          name: 'Nail Art',
          description: 'Creative nail art and design',
          price: 1200,
          originalPrice: 1500,
          duration: 45
        },
        {
          name: 'Facial',
          description: 'Luxury facial with premium products',
          price: 2000,
          originalPrice: 2500,
          duration: 90
        }
      ],
      priceRange: '₹₹₹₹',
      isOpen: false,
      waitTime: 'Closed',
      avatar: 'https://i.pravatar.cc/150?img=3',
      address: 'Elite Plaza, 2nd Floor',
      specialOffers: ['Premium bridal packages', 'VIP membership'],
    },
    {
      id: '4',
      name: 'Trendy Cuts',
      owner: 'Amit Singh',
      distance: '1.1 km',
      rating: 4.4,
      reviews: 67,
      services: [
        {
          name: 'Hair Cut',
          description: 'Quick and stylish haircut',
          price: 500,
          originalPrice: 600,
          duration: 30
        },
        {
          name: 'Beard Trim',
          description: 'Basic beard trimming service',
          price: 300,
          originalPrice: 400,
          duration: 20
        },
        {
          name: 'Hair Wash',
          description: 'Hair wash with conditioner',
          price: 200,
          originalPrice: 250,
          duration: 20
        },
        {
          name: 'Hair Styling',
          description: 'Simple hair styling',
          price: 600,
          originalPrice: 700,
          duration: 40
        }
      ],
      priceRange: '₹',
      isOpen: true,
      waitTime: '10 min',
      avatar: 'https://i.pravatar.cc/150?img=4',
      address: 'Local Market, Shop No. 15',
      specialOffers: ['Quick service guarantee', 'Affordable rates'],
    },
    {
      id: '5',
      name: 'Elegance Salon',
      owner: 'Neha Gupta',
      distance: '1.3 km',
      rating: 4.7,
      reviews: 156,
      services: [
        {
          name: 'Facial',
          description: 'Gentle facial for all skin types',
          price: 1000,
          originalPrice: 1200,
          duration: 60
        },
        {
          name: 'Manicure',
          description: 'Classic manicure service',
          price: 500,
          originalPrice: 600,
          duration: 30
        },
        {
          name: 'Pedicure',
          description: 'Relaxing pedicure with massage',
          price: 700,
          originalPrice: 800,
          duration: 45
        },
        {
          name: 'Hair Care',
          description: 'Basic hair care treatment',
          price: 800,
          originalPrice: 1000,
          duration: 45
        }
      ],
      priceRange: '₹₹',
      isOpen: true,
      waitTime: '20 min',
      avatar: 'https://i.pravatar.cc/150?img=5',
      address: 'Residential Area, Near Park',
      specialOffers: ['Family packages', 'Monthly membership'],
    },
    {
      id: '6',
      name: 'Gents Corner',
      owner: 'Vikram Malhotra',
      distance: '1.5 km',
      rating: 4.5,
      reviews: 94,
      services: [
        {
          name: 'Hair Cut',
          description: 'Professional men\'s haircut',
          price: 600,
          originalPrice: 700,
          duration: 35
        },
        {
          name: 'Beard Trim',
          description: 'Precision beard trimming',
          price: 400,
          originalPrice: 500,
          duration: 25
        },
        {
          name: 'Hair Color',
          description: 'Men\'s hair coloring service',
          price: 2000,
          originalPrice: 2500,
          duration: 75
        },
        {
          name: 'Hair Treatment',
          description: 'Men\'s hair treatment',
          price: 1200,
          originalPrice: 1500,
          duration: 60
        }
      ],
      priceRange: '₹₹',
      isOpen: true,
      waitTime: '30 min',
      avatar: 'https://i.pravatar.cc/150?img=6',
      address: 'Commercial Street, Shop No. 8',
      specialOffers: ['Gents special rates', 'Loyalty program'],
    },
    {
      id: '7',
      name: 'Pretty Nails',
      owner: 'Anjali Desai',
      distance: '1.8 km',
      rating: 4.6,
      reviews: 78,
      services: [
        {
          name: 'Nail Art',
          description: 'Creative nail art designs',
          price: 800,
          originalPrice: 1000,
          duration: 45
        },
        {
          name: 'Manicure',
          description: 'Classic manicure service',
          price: 500,
          originalPrice: 600,
          duration: 30
        },
        {
          name: 'Pedicure',
          description: 'Relaxing pedicure treatment',
          price: 700,
          originalPrice: 800,
          duration: 45
        },
        {
          name: 'Nail Extension',
          description: 'Professional nail extensions',
          price: 1500,
          originalPrice: 1800,
          duration: 90
        }
      ],
      priceRange: '₹₹',
      isOpen: true,
      waitTime: '20 min',
      avatar: 'https://i.pravatar.cc/150?img=7',
      address: 'Beauty Lane, Shop No. 12',
      specialOffers: ['Nail art packages', 'Student discounts'],
    },
    {
      id: '8',
      name: 'Classic Barbers',
      owner: 'Suresh Iyer',
      distance: '2.0 km',
      rating: 4.3,
      reviews: 45,
      services: [
        {
          name: 'Hair Cut',
          description: 'Traditional barber haircut',
          price: 400,
          originalPrice: 500,
          duration: 25
        },
        {
          name: 'Beard Trim',
          description: 'Classic beard trimming',
          price: 300,
          originalPrice: 400,
          duration: 20
        },
        {
          name: 'Hair Wash',
          description: 'Basic hair wash service',
          price: 150,
          originalPrice: 200,
          duration: 15
        },
        {
          name: 'Hair Styling',
          description: 'Simple hair styling',
          price: 500,
          originalPrice: 600,
          duration: 35
        }
      ],
      priceRange: '₹',
      isOpen: true,
      waitTime: '15 min',
      avatar: 'https://i.pravatar.cc/150?img=8',
      address: 'Old Market, Corner Shop',
      specialOffers: ['Traditional service', 'Affordable rates'],
    }
  ];

  const filteredSalons = nearbySalons.filter(salon =>
    salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    salon.services.some(service => 
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleOpenAgentChatbox = () => {
    setAgentChatboxVisible(true);
  };

  const handleCloseAgentChatbox = () => {
    setAgentChatboxVisible(false);
  };

  const handleBookAppointment = (preferences) => {
    // Handle the booking with collected preferences
    console.log('Booking appointment with preferences:', preferences);
    // Navigate to booking confirmation with preferences
    router.push({
      pathname: '/booking-confirmation',
      params: { preferences: JSON.stringify(preferences) }
    });
  };

  const renderSalonItem = ({ item }) => (
    <TouchableOpacity style={styles.salonItem} onPress={() => {
      router.push({
        pathname: '/salon-detail',
        params: { salon: JSON.stringify(item) }
      });
    }}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.salonInfo}>
        <View style={styles.salonHeader}>
          <Text style={styles.salonName}>{item.name}</Text>
          <View style={styles.distanceContainer}>
            <FontAwesome name="map-marker" size={12} color={COLORS.text.secondary} />
            <Text style={styles.distance}>{item.distance}</Text>
          </View>
        </View>
        
        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color={COLORS.warning} />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews} reviews)</Text>
          </View>
          <View style={styles.priceRange}>
            <Text style={styles.priceText}>{item.priceRange}</Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={[styles.statusIndicator, { backgroundColor: item.isOpen ? COLORS.success : COLORS.error }]}>
            <Text style={styles.statusText}>{item.isOpen ? 'Open' : 'Closed'}</Text>
          </View>
          <Text style={styles.waitTime}>{item.waitTime}</Text>
        </View>

        <View style={styles.servicesContainer}>
          {item.services.slice(0, 3).map((service, index) => (
            <Text key={index} style={styles.serviceTag}>
              {service.name}
            </Text>
          ))}
          {item.services.length > 3 && (
            <Text style={styles.moreServices}>+{item.services.length - 3} more</Text>
          )}
        </View>

        <Text style={styles.address}>{item.address}</Text>

        {item.specialOffers.length > 0 && (
          <View style={styles.offersContainer}>
            <FontAwesome name="gift" size={12} color={COLORS.primary} />
            <Text style={styles.offersText}>{item.specialOffers[0]}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome name="search" size={48} color={COLORS.text.secondary} />
      <Text style={styles.emptyText}>No salons found nearby</Text>
      <Text style={styles.emptySubtext}>Try adjusting your search or location</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Box */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color={COLORS.text.muted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search salons or services..."
          placeholderTextColor={COLORS.text.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome name="filter" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Salons List */}
      <FlatList
        data={filteredSalons}
        renderItem={renderSalonItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        style={styles.salonList}
      />

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    margin: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.xs,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.xs,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
  },
  filterButton: {
    padding: SPACING.xs,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.md,
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
  salonList: {
    flex: 1,
  },
  salonItem: {
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
  salonInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  salonHeader: {
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
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
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
  priceRange: {
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
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
    color: COLORS.text.secondary,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  serviceTag: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  moreServices: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.muted,
    marginLeft: SPACING.xs,
  },
  address: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  offersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offersText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
    fontStyle: 'italic',
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
});
