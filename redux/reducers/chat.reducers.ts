import { createSlice } from "@reduxjs/toolkit";

import { ConversationType } from "@/types";

type InitialStateType = {
  conversations: ConversationType[];
};
const initialState: InitialStateType = {
  conversations: [],
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setAllConversation: (state, action) => {
      state.conversations = action.payload;
    },
    addNewCoversation: (state, action) => {
      state.conversations.push(action.payload);
    },
    addMessageToConversation: (state, action) => {
      const { con_id, message } = action.payload;
      const convIndex = state.conversations.findIndex(
        (c) => c._id.toString() === con_id.toString()
      );

      if (convIndex !== -1) {
        state.conversations[convIndex].messages.push(message);
        console.log("message added successfully.");
      } else {
        return console.log("unable to add message to conversation.");
      }
    },

    updateConversation: (state, action) => {
      const cIndex = state.conversations.findIndex(
        (c) => c._id.toString() === action.payload?._id.toString()
      );

      if (cIndex !== -1) {
        state.conversations[cIndex] = action.payload;
        console.log("conversation updated successfully");
      } else {
        console.log("invalid conv id");
      }
    },
  },
});

export const {
  setAllConversation,
  addMessageToConversation,
  addNewCoversation,
  updateConversation,
} = chatSlice.actions;
export default chatSlice.reducer;
