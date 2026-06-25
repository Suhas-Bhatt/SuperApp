import { create } from 'zustand';

export const useStore = create((set) => ({
  // User data
  user: {
    name: '',
    username: '',
    email: '',
    mobile: '',
  },

  // Categories
  selectedCategories: [],

  // Notes
  notes: localStorage.getItem('super_app_notes') || '',

  // Movie modal
  selectedMovie: null,

  // Actions
  setUser: (userData) => set({ user: userData }),

  setCategories: (categoryArray) => set({ selectedCategories: categoryArray }),

  setNotes: (noteText) => {
    localStorage.setItem('super_app_notes', noteText);
    set({ notes: noteText });
  },

  setSelectedMovie: (movie) => set({ selectedMovie: movie }),

  resetStore: () =>
    set({
      user: { name: '', username: '', email: '', mobile: '' },
      selectedCategories: [],
      notes: '',
      selectedMovie: null,
    }),
}));
