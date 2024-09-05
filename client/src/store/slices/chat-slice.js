export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessage: [],
  directMessageContact: [],
  channels: [],

  // Setters
  setChannels: (channels) => set({ channels }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),
  setDirectMessageContact: (directMessageContact) =>
    set({ directMessageContact }),
  addChannel: (channel) => {
    const channels = get().channels;
    set({ channels: [...channels, channel] });
  },
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
