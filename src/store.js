import { create } from 'zustand';
const messageLength = -13 // 保持数组长度
const useChatStore = create((set) => ({
  messages: [],
  addMessage: (message) => set((state) => {
    const newMessages = [...state.messages, message];
    return { messages: newMessages.slice(messageLength) };
  }),
}));

export { useChatStore };