import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/types";

export interface UserState {
  me: User;
  users: User[];
}

const initialState: UserState = {
  me: {} as User,
  users: [] as User[],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<any>) => {
      state.me = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMe, setAllUsers } = userSlice.actions;

export default userSlice.reducer;
