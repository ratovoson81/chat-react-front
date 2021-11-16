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
    setMe: (state, action: PayloadAction<any>) => {
      state.me = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<any>) => {
      state.idSelectedUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMe, setAllUsers, setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
