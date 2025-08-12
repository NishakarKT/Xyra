import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import AgentChatbox from '../../components/AgentChatbox';
import { COLORS, FONTS, SPACING } from '../../constants/theme.js';

export default function PostsScreen() {
  const [newPostText, setNewPostText] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [postType, setPostType] = useState('post');
  const [expandedComments, setExpandedComments] = useState({});
  const [commentTexts, setCommentTexts] = useState({});
  const [agentChatboxVisible, setAgentChatboxVisible] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: '1',
      salonName: 'Glamour Salon & Spa',
      salonAvatar: 'https://i.pravatar.cc/150?img=1',
      content: '🎉 Special Diwali Offer! Get 30% off on all hair treatments this week. Book your appointment now and shine bright this festive season! ✨ #DiwaliSpecial #HairCare #Beauty',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
             likes: 45,
       comments: 12,
       shares: 8,
       timestamp: '2 hours ago',
       isLiked: false,
       isSalonOwner: false,
       type: 'offer',
       offerDetails: {
         discount: '30%',
         validUntil: 'Dec 15, 2024',
         services: ['Hair Treatment', 'Hair Color', 'Styling']
       },
       commentsList: [
         {
           id: '1',
           userName: 'Priya Sharma',
           userAvatar: 'https://i.pravatar.cc/150?img=10',
           comment: 'This offer looks amazing! I need to book an appointment ASAP! 💕',
           timestamp: '1 hour ago',
           likes: 3
         },
         {
           id: '2',
           userName: 'Riya Patel',
           userAvatar: 'https://i.pravatar.cc/150?img=11',
           comment: 'I had my hair treatment here last month and it was fantastic! Highly recommend! ✨',
           timestamp: '30 min ago',
           likes: 1
         }
       ]
    },
    {
      id: '2',
      salonName: 'Beauty Zone',
      salonAvatar: 'https://i.pravatar.cc/150?img=2',
      content: 'New bridal collection is here! 💍✨ Perfect your look for the most special day of your life. From hair styling to makeup, we\'ve got you covered. DM us for bookings! #BridalBeauty #WeddingSeason',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
             likes: 89,
       comments: 23,
       shares: 15,
       timestamp: '5 hours ago',
       isLiked: true,
       isSalonOwner: false,
       type: 'collection',
       commentsList: [
         {
           id: '1',
           userName: 'Anjali Singh',
           userAvatar: 'https://i.pravatar.cc/150?img=12',
           comment: 'The bridal collection is absolutely stunning! I want to book for my wedding! 👰‍♀️',
           timestamp: '4 hours ago',
           likes: 5
         },
         {
           id: '2',
           userName: 'Meera Kapoor',
           userAvatar: 'https://i.pravatar.cc/150?img=13',
           comment: 'Can you share more details about the makeup packages? 💄',
           timestamp: '3 hours ago',
           likes: 2
         }
       ]
    },
    {
      id: '3',
      salonName: 'Style Studio',
      salonAvatar: 'https://i.pravatar.cc/150?img=3',
      content: 'Before & After transformation! 🔥 This client wanted a complete makeover and we delivered! What do you think of this stunning transformation? #Transformation #HairGoals #BeforeAfter',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
             likes: 156,
       comments: 34,
       shares: 28,
       timestamp: '1 day ago',
       isLiked: false,
       isSalonOwner: false,
       type: 'transformation',
       commentsList: [
         {
           id: '1',
           userName: 'Kavya Reddy',
           userAvatar: 'https://i.pravatar.cc/150?img=14',
           comment: 'Wow! This transformation is incredible! The stylist did an amazing job! 🔥',
           timestamp: '23 hours ago',
           likes: 8
         },
         {
           id: '2',
           userName: 'Zara Khan',
           userAvatar: 'https://i.pravatar.cc/150?img=15',
           comment: 'I need this transformation too! Can you share the stylist\'s name? 💇‍♀️',
           timestamp: '22 hours ago',
           likes: 4
         }
       ]
    },
    {
      id: '4',
      salonName: 'Elite Beauty',
      salonAvatar: 'https://i.pravatar.cc/150?img=4',
      content: '💡 Pro tip: Always use a heat protectant before styling your hair! It prevents damage and keeps your locks healthy and shiny. #HairCareTips #BeautyTips #HealthyHair',
      image: null,
             likes: 67,
       comments: 18,
       shares: 9,
       timestamp: '2 days ago',
       isLiked: false,
       isSalonOwner: false,
       type: 'tip',
       commentsList: [
         {
           id: '1',
           userName: 'Neha Verma',
           userAvatar: 'https://i.pravatar.cc/150?img=16',
           comment: 'Great tip! I always forget to use heat protectant. This is a good reminder! 💡',
           timestamp: '2 days ago',
           likes: 2
         },
         {
           id: '2',
           userName: 'Pooja Sharma',
           userAvatar: 'https://i.pravatar.cc/150?img=17',
           comment: 'What heat protectant do you recommend? Any specific brand? 🤔',
           timestamp: '1 day ago',
           likes: 1
         }
       ]
    }
  ]);
  
  const router = useRouter();

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleShare = (postId) => {
    Alert.alert('Share', 'Share functionality coming soon!');
  };

  const handleCreatePost = () => {
    if (!newPostText.trim() && selectedPhotos.length === 0) return;
    
         const newPost = {
       id: Date.now().toString(),
       salonName: 'Your Salon', // This would come from user context
       salonAvatar: 'https://i.pravatar.cc/150?img=5',
       content: newPostText.trim(),
       image: selectedPhotos.length > 0 ? selectedPhotos[0] : null,
       likes: 0,
       comments: 0,
       shares: 0,
       timestamp: 'Just now',
       isLiked: false,
       isSalonOwner: true,
       type: postType,
       commentsList: []
     };
    
    setPosts([newPost, ...posts]);
    setNewPostText('');
    setSelectedPhotos([]);
    setPostType('post');
    Alert.alert('Success', 'Post created successfully!');
  };

  const handleAddPhoto = () => {
    // Simulate photo selection - in real app, this would open camera/gallery
    const newPhoto = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=400`;
    if (selectedPhotos.length < 3) {
      setSelectedPhotos([...selectedPhotos, newPhoto]);
    } else {
      Alert.alert('Photo Limit', 'You can only add up to 3 photos per post.');
    }
  };

  const handleRemovePhoto = (index) => {
    setSelectedPhotos(selectedPhotos.filter((_, i) => i !== index));
  };

  const handlePostTypeChange = (type) => {
    setPostType(type);
  };

  const handleAddComment = (postId) => {
    const commentText = commentTexts[postId];
    if (!commentText || !commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      userName: 'You',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      comment: commentText.trim(),
      timestamp: 'Just now',
      likes: 0
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...(post.commentsList || []), newComment]
        };
      }
      return post;
    }));

    // Clear comment text
    setCommentTexts(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

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



  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <TouchableOpacity style={styles.salonInfo}>
          <Image source={{ uri: item.salonAvatar }} style={styles.salonAvatar} />
          <View style={styles.salonDetails}>
            <Text style={styles.salonName}>{item.salonName}</Text>
            <Text style={styles.postTimestamp}>{item.timestamp}</Text>
          </View>
        </TouchableOpacity>
        {item.isSalonOwner && (
          <TouchableOpacity style={styles.editButton}>
            <FontAwesome name="ellipsis-h" size={16} color={COLORS.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{item.content}</Text>

      {/* Post Image */}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}

      {/* Special Offer Badge */}
      {item.type === 'offer' && item.offerDetails && (
        <View style={styles.offerBadge}>
          <FontAwesome name="gift" size={16} color={COLORS.primary} />
          <Text style={styles.offerText}>
            {item.offerDetails.discount} OFF - Valid until {item.offerDetails.validUntil}
          </Text>
        </View>
      )}

      {/* Post Type Badge */}
      <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
        <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleLike(item.id)}
        >
          <FontAwesome 
            name={item.isLiked ? "heart" : "heart-o"} 
            size={18} 
            color={item.isLiked ? COLORS.error : COLORS.text.secondary} 
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

                 <TouchableOpacity 
           style={styles.actionButton} 
           onPress={() => handleComment(item.id)}
         >
           <FontAwesome 
             name={expandedComments[item.id] ? "comment" : "comment-o"} 
             size={18} 
             color={expandedComments[item.id] ? COLORS.primary : COLORS.text.secondary} 
           />
           <Text style={[
             styles.actionText,
             expandedComments[item.id] && styles.actionTextActive
           ]}>{item.comments}</Text>
         </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleShare(item.id)}
        >
          <FontAwesome name="share" size={18} color={COLORS.text.secondary} />
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>
      </View>

      {/* Collapsible Comments Section */}
      {expandedComments[item.id] && (
        <View style={styles.commentsSection}>
          {renderComments(item)}
        </View>
      )}
    </View>
  );

  const getTypeColor = (type) => {
    switch (type) {
      case 'offer': return COLORS.success;
      case 'collection': return COLORS.primary;
      case 'transformation': return COLORS.warning;
      case 'tip': return COLORS.accent;
      default: return COLORS.text.muted;
    }
  };

  const renderComments = (post) => {
    return (
      <View style={styles.commentsContainer}>
        {/* Comment Input */}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            placeholderTextColor={COLORS.text.muted}
            value={commentTexts[post.id] || ''}
            onChangeText={(text) => setCommentTexts(prev => ({
              ...prev,
              [post.id]: text
            }))}
            multiline
            maxLength={200}
          />
          <TouchableOpacity 
            style={[
              styles.commentSubmitButton,
              (!commentTexts[post.id] || !commentTexts[post.id].trim()) && styles.commentSubmitButtonDisabled
            ]}
            onPress={() => handleAddComment(post.id)}
            disabled={!commentTexts[post.id] || !commentTexts[post.id].trim()}
          >
            <FontAwesome name="paper-plane" size={14} color={COLORS.text.light} />
          </TouchableOpacity>
        </View>

        {/* Comments List */}
        {(!post.commentsList || post.commentsList.length === 0) ? (
          <View style={styles.noCommentsContainer}>
            <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
          </View>
        ) : (
          <View style={styles.commentsList}>
            {post.commentsList.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Image source={{ uri: comment.userAvatar }} style={styles.commentAvatar} />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUserName}>{comment.userName}</Text>
                    <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.comment}</Text>
                  <TouchableOpacity style={styles.commentLikeButton}>
                    <FontAwesome name="heart-o" size={14} color={COLORS.text.muted} />
                    <Text style={styles.commentLikeText}>{comment.likes}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Enhanced Posting Interface */}
        <View style={styles.postingContainer}>
          {/* Post Type Selector */}
          <View style={styles.postTypeSelector}>
            <Text style={styles.postTypeLabel}>What's on your mind?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['post', 'offer', 'tip'].map((type) => (
                <TouchableOpacity
                  key={`type-${type}`}
                  style={[
                    styles.postTypeButton,
                    postType === type && styles.postTypeButtonActive
                  ]}
                  onPress={() => handlePostTypeChange(type)}
                >
                  <Text style={[
                    styles.postTypeButtonText,
                    postType === type && styles.postTypeButtonTextActive
                  ]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Text Input Area */}
          <View style={styles.postingInputContainer}>
            <TextInput
              style={styles.postingInput}
              placeholder="Share your thoughts, offers, or beauty tips..."
              placeholderTextColor={COLORS.text.muted}
              value={newPostText}
              onChangeText={setNewPostText}
              multiline
              maxLength={500}
            />
          </View>

          {/* Character Counter */}
          {newPostText.trim() && (
            <Text style={styles.characterCount}>{newPostText.length}/500</Text>
          )}

          {/* Photo Upload Section */}
          <View style={styles.photoSection}>
            <View style={styles.photoHeader}>
              <Text style={styles.photoLabel}>Photos ({selectedPhotos.length}/3)</Text>
              <TouchableOpacity 
                style={styles.addPhotoButton} 
                onPress={handleAddPhoto}
                disabled={selectedPhotos.length >= 3}
              >
                <FontAwesome name="camera" size={16} color={COLORS.primary} />
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </TouchableOpacity>
            </View>
            
            {/* Selected Photos Grid */}
            {selectedPhotos.length > 0 && (
              <View style={styles.photoGrid}>
                {selectedPhotos.map((photo, index) => (
                  <View key={`photo-${index}`} style={styles.photoItem}>
                    <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                    <TouchableOpacity 
                      style={styles.removePhotoButton}
                      onPress={() => handleRemovePhoto(index)}
                    >
                      <FontAwesome name="times-circle" size={20} color={COLORS.error} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              (!newPostText.trim() && selectedPhotos.length === 0) && styles.submitButtonDisabled
            ]} 
            onPress={handleCreatePost}
            disabled={!newPostText.trim() && selectedPhotos.length === 0}
          >
            <FontAwesome name="paper-plane" size={18} color={COLORS.text.light} />
            <Text style={styles.submitButtonText}>Create Post</Text>
          </TouchableOpacity>
        </View>

        {/* Posts Feed */}
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <View key={post.id}>
              {renderPost({ item: post })}
            </View>
          ))}
        </View>
      </ScrollView>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
  },
  postingContainer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  postTypeSelector: {
    marginBottom: SPACING.md,
  },
  postTypeLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  postTypeButton: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  postTypeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  postTypeButtonText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    fontWeight: FONTS.weights.medium,
  },
  postTypeButtonTextActive: {
    color: COLORS.text.light,
  },
  postingInputContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  postingInput: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    maxHeight: 120,
    paddingVertical: SPACING.xs,
    textAlignVertical: 'top',
    minHeight: 60,
  },
  characterCount: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.muted,
    textAlign: 'right',
    marginBottom: SPACING.md,
  },
  photoSection: {
    marginBottom: SPACING.md,
  },
  photoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  photoLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
    color: COLORS.text.secondary,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  addPhotoText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium,
    marginLeft: SPACING.xs,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  photoItem: {
    position: 'relative',
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: 12,
    gap: SPACING.sm,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  submitButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.light,
    fontWeight: FONTS.weights.medium,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  postsContainer: {
    padding: SPACING.md,
  },
  postCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  salonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  salonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  salonDetails: {
    flex: 1,
  },
  salonName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
  },
  postTimestamp: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.muted,
    marginTop: 2,
  },
  editButton: {
    padding: SPACING.xs,
  },
  postContent: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    lineHeight: 22,
    marginBottom: SPACING.sm,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: SPACING.sm,
  },
  offerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  offerText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
    fontWeight: FONTS.weights.medium,
  },
  typeBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  typeText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.light,
    fontWeight: FONTS.weights.bold,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  actionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  actionTextActive: {
    color: COLORS.primary,
  },
  commentsSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  commentsContainer: {
    paddingHorizontal: SPACING.sm,
  },
  noCommentsContainer: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  noCommentsText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.muted,
    fontStyle: 'italic',
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: SPACING.sm,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  commentUserName: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginRight: SPACING.sm,
  },
  commentTimestamp: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.muted,
  },
  commentText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
    lineHeight: 18,
    marginBottom: SPACING.xs,
  },
  commentLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  commentLikeText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.text.muted,
    marginLeft: SPACING.xs,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  commentInput: {
    flex: 1,
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
    maxHeight: 80,
    paddingVertical: SPACING.xs,
    textAlignVertical: 'top',
    minHeight: 20,
  },
  commentSubmitButton: {
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
  commentSubmitButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  commentsList: {
    paddingHorizontal: SPACING.sm,
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
