import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ANIMATION, COLORS, FONTS, SHADOWS, SPACING } from '../constants/theme';

export default function AgentChatbox({ visible, onClose, onBookAppointment }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bookingPreferences, setBookingPreferences] = useState({});
  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Initial greeting message with dummy conversation
  useEffect(() => {
    if (visible) {
      setMessages([
        {
          id: '1',
          text: "Hi! Main Nyra hun, aapki AI assistant. Main aapko appointments book karne mein help kar sakti hun. Aap kya service dekh rahe hain aaj?",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ['Haircut', 'Facial', 'Manicure', 'Pedicure', 'Massage', 'Spa Treatment']
        },
        {
          id: '2',
          text: "Hi Nyra! Main offers dekh raha hun. Is month mein kya deals hain?",
          isUser: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: '3',
          text: "Bahut badhiya question! Is month mein humare paas amazing offers hain:\n\n✨ Facial treatments pe 20% off\n✨ Manicures pe buy 2 get 1 free\n✨ New customers ke liye haircuts pe 15% off\n✨ Spa package pe 25% discount\n\nAapko kaun si service most interesting lag rahi hai?",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ['Facial Treatment', 'Manicure Package', 'Haircut', 'Spa Package']
        },
        {
          id: '4',
          text: "Facial treatment toh bahut acchi lag rahi hai! Kya main kal afternoon mein slot book kar sakta hun?",
          isUser: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: '5',
          text: "Perfect! Main aapki facial treatment kal afternoon ke liye book karne mein help karungi. Let me check available slots aur kuch aur details gather karungi taki aapko best experience mile.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setBookingPreferences({
        service: 'Facial Treatment',
        timePreference: 'Afternoon',
        date: 'Tomorrow',
        offer: '20% off'
      });
      animateIn();
    }
  }, [visible]);

  const animateIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.duration.normal,
      useNativeDriver: true,
    }).start();
  };

  const animateOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: ANIMATION.duration.fast,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText, bookingPreferences);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Update preferences based on conversation
      updatePreferences(inputText, aiResponse);
    }, 1000);
  };

  const generateAIResponse = (userInput, preferences) => {
    const responses = [
      {
        text: "Bahut accha choice! Main dekh sakti hun ki aapko ye service pasand aa rahi hai. Aap kab book karna chahenge?",
        suggestions: ['Today', 'Tomorrow', 'This Week', 'Next Week']
      },
      {
        text: "Perfect timing! Mere paas several slots available hain. Aapko din mein kaunsa time best lagta hai?",
        suggestions: ['Morning', 'Afternoon', 'Evening']
      },
      {
        text: "Excellent! Maine aapki preferences note kar li hain. Kya aapko service ke baare mein kuch specific batana hai?",
        suggestions: ['No special requests', 'First time customer', 'Specific stylist preference']
      }
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Date.now().toString(),
      text: randomResponse.text,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: randomResponse.suggestions
    };
  };

  const updatePreferences = (userInput, aiResponse) => {
    // Simple preference extraction logic
    const input = userInput.toLowerCase();
    const newPreferences = { ...bookingPreferences };

    if (input.includes('haircut') || input.includes('hair')) {
      newPreferences.service = 'Haircut';
    } else if (input.includes('facial')) {
      newPreferences.service = 'Facial Treatment';
    } else if (input.includes('manicure')) {
      newPreferences.service = 'Manicure';
    } else if (input.includes('pedicure')) {
      newPreferences.service = 'Pedicure';
    } else if (input.includes('massage')) {
      newPreferences.service = 'Massage';
    } else if (input.includes('spa')) {
      newPreferences.service = 'Spa Treatment';
    }

    if (input.includes('morning')) {
      newPreferences.timePreference = 'Morning';
    } else if (input.includes('afternoon')) {
      newPreferences.timePreference = 'Afternoon';
    } else if (input.includes('evening')) {
      newPreferences.timePreference = 'Evening';
    }

    if (input.includes('today')) {
      newPreferences.date = 'Today';
    } else if (input.includes('tomorrow')) {
      newPreferences.date = 'Tomorrow';
    } else if (input.includes('week')) {
      newPreferences.date = 'This Week';
    }

    setBookingPreferences(newPreferences);
  };

  const handleBookNow = () => {
    if (onBookAppointment) {
      onBookAppointment(bookingPreferences);
    }
    // Navigate to booking confirmation with preferences
    // This will be handled by the parent component
    animateOut();
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.aiMessage]}>
      {!item.isUser && (
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image 
              source={require('../assets/images/Nyra.avif')}
              style={styles.messageAvatarImage}
            />
          </View>
        </View>
      )}
      <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.messageText, item.isUser ? styles.userMessageText : styles.aiMessageText]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={styles.typingContainer}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image 
            source={require('../assets/images/Nyra.avif')}
            style={styles.messageAvatarImage}
          />
        </View>
      </View>
      <View style={styles.typingBubble}>
        <View style={styles.typingDots}>
          <Animated.View style={[styles.typingDot, styles.dot1]} />
          <Animated.View style={[styles.typingDot, styles.dot2]} />
          <Animated.View style={[styles.typingDot, styles.dot3]} />
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={animateOut}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerTitleContainer}>
              <View style={styles.avatarHeader}>
                <Image 
                  source={require('../assets/images/Nyra.avif')}
                  style={styles.avatarImage}
                />
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Nyra</Text>
                <Text style={styles.headerSubtitle}>Your AI Assistant</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={animateOut} style={styles.closeButton}>
            <FontAwesome name="times" size={20} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          ListFooterComponent={isTyping ? renderTypingIndicator : null}
        />

        {/* Preferences Summary */}
        {Object.keys(bookingPreferences).length > 0 && (
          <View style={styles.preferencesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Object.entries(bookingPreferences).map(([key, value]) => (
                <View key={key} style={styles.preferenceTag}>
                  <Text style={styles.preferenceText}>{value}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor={COLORS.text.muted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <FontAwesome name="send" size={16} color={COLORS.text.light} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
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
  closeButton: {
    padding: SPACING.sm,
  },
  headerContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarHeader: {
    marginRight: SPACING.sm,
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerTextContainer: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  bookNowButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.sm,
    opacity: 0.8,
  },
  bookNowText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.light,
    fontWeight: FONTS.weights.medium,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: SPACING.sm,
    alignItems: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: SPACING.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: SPACING.md,
    borderRadius: SPACING.md,
    ...SHADOWS.sm,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    marginLeft: 'auto',
  },
  aiBubble: {
    backgroundColor: COLORS.surface,
  },
  messageText: {
    fontSize: FONTS.sizes.md,
    lineHeight: 20,
  },
  userMessageText: {
    color: COLORS.text.light,
  },
  aiMessageText: {
    color: COLORS.text.primary,
  },
  timestamp: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.tertiary,
    marginTop: SPACING.sm,
    alignSelf: 'flex-end',
  },
  preferencesContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  preferencesTitle: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  preferenceTag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.sm,
    marginRight: SPACING.sm,
  },
  preferenceText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.light,
    fontWeight: FONTS.weights.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    maxHeight: 100,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  typingBubble: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: SPACING.md,
    maxWidth: '80%',
    ...SHADOWS.sm,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.text.tertiary,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 0.8,
  },
  messageAvatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
