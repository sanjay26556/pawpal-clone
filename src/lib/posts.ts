import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import type { Post, Comment } from '@/types';

const POSTS_COLLECTION = 'posts';

export async function fetchFeedPosts(max: number = 25): Promise<Post[]> {
  const q = query(collection(db, POSTS_COLLECTION), orderBy('createdAt', 'desc'), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      userId: data.userId,
      images: data.images || [],
      caption: data.caption || '',
      hashtags: data.hashtags || [],
      location: data.location,
      likes: data.likes || [],
      comments: (data.comments || []) as Comment[],
      saves: data.saves || [],
      createdAt: (data.createdAt?.toDate?.() ?? new Date()) as Date,
      updatedAt: (data.updatedAt?.toDate?.() ?? new Date()) as Date,
      isSponsored: data.isSponsored,
    } as Post;
  });
}

export async function fetchUserPosts(userId: string, max: number = 30): Promise<Post[]> {
  // Avoid requiring a Firestore composite index for where+orderBy; sort client-side instead
  const q = query(collection(db, POSTS_COLLECTION), where('userId', '==', userId), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      userId: data.userId,
      images: data.images || [],
      caption: data.caption || '',
      hashtags: data.hashtags || [],
      location: data.location,
      likes: data.likes || [],
      comments: (data.comments || []) as Comment[],
      saves: data.saves || [],
      createdAt: (data.createdAt?.toDate?.() ?? new Date()) as Date,
      updatedAt: (data.updatedAt?.toDate?.() ?? new Date()) as Date,
      isSponsored: data.isSponsored,
    } as Post;
  });
}

export function subscribeFeedPosts(max: number, onChange: (posts: Post[]) => void): () => void {
  const q = query(collection(db, POSTS_COLLECTION), orderBy('createdAt', 'desc'), limit(max));
  const unsub = onSnapshot(q, (snap) => {
    const posts: Post[] = snap.docs.map((d) => {
      const data = d.data() as any;
      return {
        id: d.id,
        userId: data.userId,
        images: data.images || [],
        caption: data.caption || '',
        hashtags: data.hashtags || [],
        location: data.location,
        likes: data.likes || [],
        comments: (data.comments || []) as Comment[],
        saves: data.saves || [],
        createdAt: (data.createdAt?.toDate?.() ?? new Date()) as Date,
        updatedAt: (data.updatedAt?.toDate?.() ?? new Date()) as Date,
        isSponsored: data.isSponsored,
      } as Post;
    });
    onChange(posts);
  });
  return unsub;
}

export async function toggleLike(postId: string, userId: string, liked: boolean): Promise<void> {
  const ref = doc(db, POSTS_COLLECTION, postId);
  await updateDoc(ref, {
    likes: liked ? arrayRemove(userId) : arrayUnion(userId),
    updatedAt: serverTimestamp(),
  });
}

export async function addComment(postId: string, userId: string, text: string): Promise<void> {
  const ref = doc(db, POSTS_COLLECTION, postId);
  const newComment: Comment = {
    id: crypto.randomUUID(),
    userId,
    text,
    likes: [],
    replies: [],
    createdAt: new Date(),
  };
  await updateDoc(ref, {
    comments: arrayUnion(newComment),
    updatedAt: serverTimestamp(),
  });
}

export async function createPost(input: {
  userId: string;
  images: string[];
  caption: string;
  hashtags: string[];
  location?: string;
}): Promise<string> {
  const ref = await addDoc(collection(db, POSTS_COLLECTION), {
    userId: input.userId,
    images: input.images,
    caption: input.caption,
    hashtags: input.hashtags,
    location: input.location || null,
    likes: [],
    comments: [],
    saves: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}


