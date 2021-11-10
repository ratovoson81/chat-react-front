import { Groupe } from "../api/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface MessageState {
  groupes: Groupe[];
  selectedGroupe: Groupe;
}

const initialState: MessageState = {
  groupes: [] as Groupe[],
  selectedGroupe: {} as Groupe,
};

export const groupeSlice = createSlice({
  name: "groupe",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<any>) => {
      state.groupes = action.payload;
    },
    setSelectedGroupe: (state, action: PayloadAction<any>) => {
      state.selectedGroupe = action.payload;
    },
  },
});

export const { setAllUsers, setSelectedGroupe } = groupeSlice.actions;

export default groupeSlice.reducer;
