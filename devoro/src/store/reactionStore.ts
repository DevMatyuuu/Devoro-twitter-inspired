import { create } from 'zustand';


interface reactionState {
    isComment: boolean,
    setIsComment: (value: boolean) => void;
    isHeart: boolean,
    setIsHeart: (value: boolean) => void;
    isRepost: boolean,
    setIsRepost: (value: boolean) => void;
    commentCount: number;
    setCommentCount: (value: number) => void;
    heartCount: number;
    setHeartCount: (value: number) => void;
    repostCount: number;
    setRepostCount: (value: number) => void;

  }
  
  const useReactionStore = create<reactionState>()(

        (set) => ({
          //comment
          isComment: false,
          setIsComment: (value: boolean) => set({ isComment: value }),
          commentCount: 0,
          setCommentCount: (value: number) => set({ commentCount: value }),

          //heart
          isHeart: false,
          setIsHeart: (value: boolean) => set({ isHeart: value }),
          heartCount: 0,
          setHeartCount: (value: number) => set({ heartCount: value }),

          //repost
          isRepost: false,
          setIsRepost: (value: boolean) => set({ isRepost: value }),
          repostCount: 0,
          setRepostCount: (value: number) => set({ heartCount: value }),
        }),

    );
  
  export default useReactionStore;