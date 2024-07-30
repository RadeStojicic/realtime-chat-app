import { TMessage } from "@/pages/home/_components/MessageContainer/Messages";
import { TConversation } from "@/pages/home/_components/SidebarContainer/Conversations";
import { create } from "zustand";

type ConversationState = {
  selectedConversation: TConversation | null;
  messages: TMessage[];
};

type ConversationActions = {
  setSelectedConversation: (conversation: TConversation | null) => void;
  setMessages: (messages: TMessage[]) => void;
};

type UseConversationReturnType = ConversationState & ConversationActions;

const useConversation = create<UseConversationReturnType>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: TConversation | null) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages: TMessage[]) => set({ messages }),
}));

export default useConversation;
