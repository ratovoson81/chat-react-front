import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Groupe, User } from "../api/types";

export interface UserState {
  groupes: Groupe[];
  selectedUser: User;
  me: User;
}

const initialState: UserState = {
  groupes: [] as Groupe[],
  selectedUser: {} as User,
  me: {} as User,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<any>) => {
      state.groupes = action.payload;
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
