import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/types";

export interface UserState {
  me: User;
}

const initialState: UserState = {
  me: {} as User,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<any>) => {
      state.me = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMe } = userSlice.actions;

export default userSlice.reducer;
