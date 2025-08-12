import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS, FONTS, SPACING } from '../constants/theme.js';

export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  
  // Get chat data from navigation params or use default
  const chatData = {
    name: 'Priya Sharma',
    salonName: 'Glamour Salon & Spa',
    avatar: 'https://i.pravatar.cc/150?img=1'
  };
  
  const [messages] = useState([
    {
      id: '1',
      text: 'Haan bilkul, aapka appointment confirm ho gaya hai! Kal 3 PM ko aana',
      isUser: false,
      timestamp: '2:30 PM'
    },
    {
      id: '2',
      text: 'Perfect! Thank you so much. Kya main apne family ko bhi le kar aa sakta hun?',
      isUser: true,
      timestamp: '2:32 PM'
    },
    {
      id: '3',
      text: 'Bilkul! Aap apne family ko bhi le kar aa sakte hain. Kitne log honge?',
      isUser: false,
      timestamp: '2:33 PM'
    },
    {
      id: '4',
      text: '3 people including me. Kya aap sabke liye appointment de sakte hain?',
      isUser: true,
      timestamp: '2:35 PM'
    },
    {
      id: '5',
      text: 'Haan bilkul! Main aapke liye 3 appointments book kar deta hun. 3 PM, 3:30 PM, aur 4 PM. Theek hai?',
      isUser: false,
      timestamp: '2:36 PM'
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.otherMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.isUser ? styles.userMessageText : styles.otherMessageText
      ]}>
        {item.text}
      </Text>
      <Text style={[
        styles.timestamp,
        item.isUser ? styles.userTimestamp : styles.otherTimestamp
      ]}>
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Chat Header */}
      <View style={{...styles.header, paddingTop: 56}}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color={COLORS.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image 
            source={{ uri: chatData.avatar }} 
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerName}>{chatData.name}</Text>
            <Text style={styles.headerSubtitle}>{chatData.salonName}</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={COLORS.text.muted}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome name="send" size={16} color={COLORS.text.light} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  headerName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
  },
  menuButton: {
    padding: SPACING.xs,
  },
  messagesList: {
    flex: 1,
    padding: SPACING.md,
  },
  messageContainer: {
    marginBottom: SPACING.md,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  messageText: {
    fontSize: FONTS.sizes.md,
    lineHeight: 20,
  },
  userMessageText: {
    color: COLORS.text.light,
  },
  otherMessageText: {
    color: COLORS.text.primary,
  },
  timestamp: {
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
    textAlign: 'right',
  },
  userTimestamp: {
    color: COLORS.text.light,
    opacity: 0.8,
  },
  otherTimestamp: {
    color: COLORS.text.secondary,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
