import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/types";

export interface UserState {
  users: User[];
  selectedUser: User;
  me: User;
}

const initialState: UserState = {
  users: [] as User[],
  selectedUser: {} as User,
  me: {} as User,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<any>) => {
      state.selectedUser = action.payload;
    },
    setMe: (state, action: PayloadAction<any>) => {
      state.me = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllUsers, setSelectedUser, setMe } = userSlice.actions;

export default userSlice.reducer;
