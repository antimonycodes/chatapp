import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./Firebase";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  currentUser: null, // Add currentUser to the store
  // Function to set currentUser
  setCurrentUser: (currentUser) => set({ currentUser }),

  changeChat: async (chatId, user) => {
    const currentUser = useChatStore.getState().currentUser;

    // Check if user or currentUser is undefined
    if (!user || !currentUser) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }

    // Check if current user is blocked
    if (user.blocked && user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // Check if receiver is blocked
    if (currentUser.blocked && currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }

    // Default case
    set({
      chatId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },

  changeBlock: () => {
    set((state) => ({
      ...state,
      isCurrentUserBlocked: !state.isCurrentUserBlocked, // Toggle isCurrentUserBlocked
      isReceiverBlocked: !state.isReceiverBlocked, // Toggle isReceiverBlocked
    }));
  },
}));
