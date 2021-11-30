import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/types";

export interface UserState {
  me: User;
  users: User[];
  idSelectedUser: number;
}

const initialState: UserState = {
  me: {} as User,
  users: [] as User[],
  idSelectedUser: -1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<User>) => {
      state.me = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<any>) => {
      state.idSelectedUser = action.payload;
    },
    setIsOnline: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMe, setAllUsers, setSelectedUser, setIsOnline } =
  userSlice.actions;

export default userSlice.reducer;
