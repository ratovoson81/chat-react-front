import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../api/types";

export interface MessageState {
  chatOpened: Message[];
}

const initialState: MessageState = {
  chatOpened: [] as Message[],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<any>) => {
      state.chatOpened = action.payload;
    },
  },
});

export const { setChat } = messageSlice.actions;

export default messageSlice.reducer;
