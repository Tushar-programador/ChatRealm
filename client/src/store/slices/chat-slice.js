export const createChatSlice = (set, get) => ({
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
      selectedChatType: undefined,
      selectedChatData: undefined,
      selectedChatMessage: [],
    }),

  // Add a new message to the selected chat
  addMessage: (message) => {
    const selectedChatMessage = get().selectedChatMessage;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessage: [
        ...selectedChatMessage,
        {
          message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
});
