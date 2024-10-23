import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
      messages: [], // Stores the message objects
      error: null,   // Error message (if any)
    },
    reducers: {
      oldMessages(state, action) {
        state.messages = action.payload;
      },
      addMessages(state, action) {
        state.messages = [...state.messages, action.payload];
      },
      updateMessageState(state, action) { 
        const message = state.messages.find(msg => msg._id === action.payload.messageId);
        if (message) {
          message.state = action.payload.newState; // Update the message's state (sent, delivered, seen)
        }
      },
    },
  });
  
  export const { oldMessages, addMessages, updateMessageState } = messageSlice.actions;
  
  export const messagesReducer = messagesSlice.reducer;
