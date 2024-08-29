export const createChatSlice = (set) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessage: [],

  // Setters
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),

  // Reset all state when closing chat
  closeChat: () =>
    set({
      selectedChatType: undefined, // Fixing the typo
      selectedChatData: undefined, // Fixing the typo
      selectedChatMessage: [],
    }),
});
