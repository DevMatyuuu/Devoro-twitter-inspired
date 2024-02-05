import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db, storage } from '../firebase/firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString, } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

interface PostState {
  user: null,
  setUser: (value: null) => void,
  input: string;
  setInput: (value: string) => void;
  media: null
  setMedia: (value: null) => void;
  emoji: boolean
  setEmoji: (value: boolean) => void;
  loading: boolean
  setLoading: (value: boolean) => void;
  sendPost: () => Promise<void>;
}

const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (value) => set({user: value}),
      input: '',
      setInput: (value) => set({ input: value }),
      media: null,
      setMedia: (newMedia) => set({ media: newMedia }),
      emoji: false,
      setEmoji: (newEmoji) => set({ emoji: newEmoji }),
      loading: false,
      setLoading: (newLoading) => set({ loading: newLoading }),

      sendPost: async () => {
        try {
          const { input, media, loading, setLoading, setInput, setMedia, setEmoji } = usePostStore.getState();

          if (loading) return;

          setLoading(true);

          const docRef = await addDoc(collection(db, 'posts'), {
            id: uuidv4(), 
            text: input,
            timestamp: serverTimestamp(),
          });

          const imageRef = ref(storage, `posts/${docRef.id}/image`);

          if (media) {
            await uploadString(imageRef, media, 'data_url');
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, 'posts', docRef.id), {
              image: downloadURL,
            });
          }

          setLoading(false);
          setInput('');
          setMedia(null);
          setEmoji(false);

          console.log('Post successfully submitted:', docRef.id);
        } catch (error) {
          console.error('Error submitting post:', error);
        }
      },
    }),
    {
      name: 'postStore', 
    }
  )
);

export default usePostStore;
