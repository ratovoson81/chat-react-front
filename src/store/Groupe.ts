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
      /*.slice()
        .sort(
          (a: any, b: any) =>
            new Date(b.messages[0]?.date).getTime() -
            new Date(a.messages[0]?.date).getTime()
        );*/
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
      console.log(index);

      if (index !== -1) {
        state.groupes[index].messages.unshift(action.payload.message);
      }
      /*state.groupes.sort(
        (a: any, b: any) =>
          new Date(b.messages[0]?.date).getTime() -
          new Date(a.messages[0]?.date).getTime()
      );*/
    },
    /*arrivalMessageSelectedGroupe: (state, action: PayloadAction<any>) => {
      state.selectedGroupe.messages.unshift(action.payload);
    },*/
  },
});

export const { setExist, setAllGroupe, selectGroupe, arrivalMessageAllGroupe } =
  groupeSlice.actions;

export default groupeSlice.reducer;
