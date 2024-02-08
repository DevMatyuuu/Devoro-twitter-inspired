import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface PostState {
  url: string | null,
  setUrl: (value: string) => void;
  input: string;
  setInput: (value: string) => void;
  media: null
  setMedia: (value: null) => void;
  emoji: boolean
  setEmoji: (value: boolean) => void;
  loading: boolean
  setLoading: (value: boolean) => void;
}

const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      url: null,
      setUrl: (value: string) => set({ url: value }),
      input: '',
      setInput: (value) => set({ input: value }),
      media: null,
      setMedia: (newMedia) => set({ media: newMedia }),
      emoji: false,
      setEmoji: (newEmoji) => set({ emoji: newEmoji }),
      loading: false,
      setLoading: (newLoading) => set({ loading: newLoading }),

    }),
    {
      name: 'postStore', 
    }
  )
);

export default usePostStore;
