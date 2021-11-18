import { Groupe } from "../api/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface MessageState {
  groupes: Groupe[];
  idselectedGroupe: number;
  exist: Boolean;
}

const initialState: MessageState = {
  groupes: [] as Groupe[],
  idselectedGroupe: -1,
  exist: true,
};

export const groupeSlice = createSlice({
  name: "groupe",
  initialState,
  reducers: {
    setAllGroupe: (state, action: PayloadAction<any>) => {
      state.groupes = action.payload;
    },
    selectGroupe: (state, action: PayloadAction<any>) => {
      state.idselectedGroupe = action.payload;
    },
    setExist: (state, action: PayloadAction<any>) => {
      state.exist = action.payload;
    },
    arrivalMessageAllGroupe: (state, action: PayloadAction<any>) => {
      const index = state.groupes.findIndex(
        (g) => g.id === action.payload.idgroupe
      );

      if (index !== -1) {
        state.groupes[index].messages.unshift(action.payload.message);
      }
    },
    viewMessage: (state, action: PayloadAction<any>) => {
      console.log("hhhh", action.payload.groupe);
      const index = state.groupes.findIndex(
        (g) => g.id === action.payload.groupe.id
      );
      if (index !== -1) {
        state.groupes[index] = action.payload.groupe;
      }
    },
    sortGroupeByDate: (state) => {
      state.groupes.sort(
        (a: any, b: any) =>
          new Date(b.messages[0]?.date).getTime() -
          new Date(a.messages[0]?.date).getTime()
      );
    },
  },
});

export const {
  setExist,
  setAllGroupe,
  selectGroupe,
  arrivalMessageAllGroupe,
  viewMessage,
  sortGroupeByDate,
} = groupeSlice.actions;

export default groupeSlice.reducer;
