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
import AgentChatbox from '../../components/AgentChatbox';
import { COLORS, FONTS, SPACING } from '../../constants/theme.js';

export default function SalonChatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [agentChatboxVisible, setAgentChatboxVisible] = useState(false);
  const router = useRouter();
  
  // Dummy chats data
  const chats = [
    {
      id: '1',
      name: 'Priya Sharma',
      salonName: 'Glamour Salon & Spa',
      lastMessage: 'Haan bilkul, aapka appointment confirm ho gaya hai! Kal 3 PM ko aana',
      time: '2 min ago',
      unread: 2,
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      salonName: 'Beauty Zone',
      lastMessage: 'Sir, aapka hair cut ka appointment kya time rakhna chahenge?',
      time: '15 min ago',
      unread: 0,
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: '3',
      name: 'Meera Patel',
      salonName: 'Luxe Hair Studio',
      lastMessage: 'Thank you! Aapka facial treatment complete ho gaya hai. Rate kya laga?',
      time: '1 hour ago',
      unread: 1,
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: '4',
      name: 'Amit Singh',
      salonName: 'Trendy Cuts',
      lastMessage: 'Bhai, aapka beard trim ka appointment cancel kar diya hai. Koi problem?',
      time: '2 hours ago',
      unread: 0,
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: '5',
      name: 'Neha Gupta',
      salonName: 'Elegance Salon',
      lastMessage: 'Haan, aapka bridal makeup package book kar liya hai. Date confirm karo',
      time: '3 hours ago',
      unread: 3,
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: '6',
      name: 'Vikram Malhotra',
      salonName: 'Gents Corner',
      lastMessage: 'Sir, aapka hair color treatment ka appointment kal 11 AM ko hai',
      time: '5 hours ago',
      unread: 0,
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    {
      id: '7',
      name: 'Anjali Desai',
      salonName: 'Pretty Nails',
      lastMessage: 'Aapka nail art design ready hai! Kya aapko pasand aaya?',
      time: '1 day ago',
      unread: 0,
      avatar: 'https://i.pravatar.cc/150?img=7',
    },
    {
      id: '8',
      name: 'Suresh Iyer',
      salonName: 'Classic Barbers',
      lastMessage: 'Bhai, aapka hair cut ka appointment kal 2 PM ko confirm hai',
      time: '1 day ago',
      unread: 1,
      avatar: 'https://i.pravatar.cc/150?img=8',
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.salonName.toLowerCase().includes(searchQuery.toLowerCase())
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

  const renderChatItem = ({ item }) => (
                    <TouchableOpacity style={styles.chatItem} onPress={() => router.push('chat')}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={2}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome name="scissors" size={48} color={COLORS.text.secondary} />
      <Text style={styles.emptyText}>Koi salon bookings nahi hai</Text>
      <Text style={styles.emptySubtext}>Apna pehla appointment book karein</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Box */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color={COLORS.text.muted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          placeholderTextColor={COLORS.text.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Scrollable Chats List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        style={styles.chatList}
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
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    paddingRight: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SPACING.md,
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  name: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
  },
  time: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginRight: 0,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    marginRight: SPACING.sm,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  unreadText: {
    color: COLORS.text.light,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
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
