import { MessageChat } from "./../api/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface MessageState {
  chatOpened: MessageChat[];
}

const initialState: MessageState = {
  chatOpened: [] as MessageChat[],
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
