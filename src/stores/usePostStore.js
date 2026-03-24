import { create } from 'zustand';

const usePostStore = create((set) => ({
  // State
  selectedPost: null,
  isModalVisible: false,
  modalMode: 'create', // 'create' or 'edit'
  
  // Actions
  setSelectedPost: (post) => set({ selectedPost: post }),
  openModal: (mode, post = null) => set({ 
    modalMode: mode, 
    selectedPost: post,
    isModalVisible: true 
  }),
  closeModal: () => set({ 
    isModalVisible: false, 
    selectedPost: null,
    modalMode: 'create'
  }),
}));

export default usePostStore;