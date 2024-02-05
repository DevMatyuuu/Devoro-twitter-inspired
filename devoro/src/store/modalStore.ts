import { create } from 'zustand';


interface ModalState {
    isOpen: boolean;
    setOpen: () => void;
    setClose: () => void;
  }
  
  const useModalStore = create<ModalState>()(
        (set) => ({
          isOpen: false,
          setOpen: () => set({ isOpen: true }),
          setClose: () => set({ isOpen: false }),
        }),
    );
  
  export default useModalStore;