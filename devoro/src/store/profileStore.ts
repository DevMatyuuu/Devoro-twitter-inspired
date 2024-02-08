import { create } from 'zustand';

interface ProfileState {
    profileLoading: boolean;
    setProfileLoading: (value: boolean) => void;
  }

  const useProfileStore = create<ProfileState>()(
    (set) => ({
        profileLoading: false,
        setProfileLoading: (value) => set({ profileLoading: value }),
    }),
);

export default useProfileStore;