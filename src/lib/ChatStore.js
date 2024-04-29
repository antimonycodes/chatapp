import { create } from "zustand";
import { useUserStore } from "./Userstore";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: async (chatId, user) => {
    // Get the currentUser from useUserStore
    const { currentUser } = useUserStore.getState();

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
        username: user.username, // Access username property
        avatar: user.avatar, // Access avatar property
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
