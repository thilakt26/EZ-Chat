import { create } from 'zustand'

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set((state) => ({ selectedConversation })),
 messages:[],
 setMessage:(messages)=>set({messages}),
}))
export default useConversation


//here i used zustand package so when the user click on the contacts that can look selected and more info visit zustand 