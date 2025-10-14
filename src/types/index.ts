// User types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Post types
export interface Post {
  id: string;
  userId: string;
  images: string[];
  caption: string;
  hashtags: string[];
  location?: string;
  likes: string[]; // userIds who liked
  comments: Comment[];
  saves: string[]; // userIds who saved
  createdAt: Date;
  updatedAt: Date;
  isSponsored?: boolean;
}

// Pet types
export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed?: string;
  age?: string;
  description: string;
  imageUrls: string[];
  status: 'available' | 'adopted' | 'pending';
  contactInfo: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

// Notification types
export interface NotificationState {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

// Instagram-like story
export interface Story {
  id: string;
  userId: string;
  media: string;
  duration: number;
  viewers: string[];
  createdAt: Date;
  expiresAt: Date;
}

// Instagram-like user profile
export interface ProfileUser {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  followers: string[];
  following: string[];
  posts: number;
  isPrivate: boolean;
  isVerified: boolean;
  website?: string;
}

// Instagram-like comment (supports nesting)
export interface Comment {
  id: string;
  userId: string;
  text: string;
  likes: string[];
  replies: Comment[];
  createdAt: Date;
}