import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./Firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        set({ currentUser: userData, isLoading: false });
      } else {
        console.log("User document does not exist");
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
