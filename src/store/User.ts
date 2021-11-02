import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/types";

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [] as any,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
    decrement: (state) => {
      //state.users -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      //state.users += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllUsers, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
