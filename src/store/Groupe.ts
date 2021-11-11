import { Groupe } from "../api/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface MessageState {
  groupes: Groupe[];
  selectedGroupe: Groupe;
  exist: Boolean;
}

const initialState: MessageState = {
  groupes: [] as Groupe[],
  selectedGroupe: {} as Groupe,
  exist: true,
};

export const groupeSlice = createSlice({
  name: "groupe",
  initialState,
  reducers: {
    setAllGroupe: (state, action: PayloadAction<any>) => {
      state.groupes = action.payload;
    },
    setSelectedGroupe: (state, action: PayloadAction<any>) => {
      state.selectedGroupe = action.payload;
    },
    setExist: (state, action: PayloadAction<any>) => {
      state.exist = action.payload;
    },
  },
});

export const { setExist, setAllGroupe, setSelectedGroupe } =
  groupeSlice.actions;

export default groupeSlice.reducer;
