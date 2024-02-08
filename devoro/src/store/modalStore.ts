import { create } from 'zustand';


interface ModalState {
    isLogoutModalOpen: boolean;
    setLogoutOpen: () => void;
    setLogoutClose: () => void;
    isUpdateModalOpen: boolean;
    setUpdateOpen: () => void;
    setUpdateClose: () => void;
  }
  
  const useModalStore = create<ModalState>()(
        (set) => ({
          //logout modal
          isLogoutModalOpen: false,
          setLogoutOpen: () => set({ isLogoutModalOpen: true }),
          setLogoutClose: () => set({ isLogoutModalOpen: false }),

          //update modal
          isUpdateModalOpen: false,
          setUpdateOpen: () => set({ isUpdateModalOpen: true }),
          setUpdateClose: () => set({ isUpdateModalOpen: false }),
        }),
    );
  
  export default useModalStore;