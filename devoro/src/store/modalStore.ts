import { create } from 'zustand';


interface ModalState {
    isLogoutModalOpen: boolean;
    setLogoutOpen: () => void;
    setLogoutClose: () => void;
    isDeleteModalOpen: boolean;
    setDeleteOpen: () => void;
    setDeleteClose: () => void;
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

          //delete modal
          isDeleteModalOpen: false,
          setDeleteOpen: () => set({ isDeleteModalOpen: true }),
          setDeleteClose: () => set({ isDeleteModalOpen: false }),

          //update modal
          isUpdateModalOpen: false,
          setUpdateOpen: () => set({ isUpdateModalOpen: true }),
          setUpdateClose: () => set({ isUpdateModalOpen: false }),
        }),
    );
  
  export default useModalStore;