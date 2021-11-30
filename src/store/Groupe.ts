import { Groupe } from "./../api/types";
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
  exist: false,
};

export const groupeSlice = createSlice({
  name: "groupe",
  initialState,
  reducers: {
    setAllGroupe: (state, action: PayloadAction<Groupe[]>) => {
      state.groupes = action.payload;
    },
    selectGroupe: (state, action: PayloadAction<number>) => {
      state.idselectedGroupe = action.payload;
    },
    setExist: (state, action: PayloadAction<boolean>) => {
      state.exist = action.payload;
    },
    arrivalMessageAllGroupe: (state, action: PayloadAction<any>) => {
      const index = state.groupes.findIndex(
        (g) => g.id === action.payload.idgroupe
      );

      if (
        index !== -1 &&
        state.groupes[index].messages[0].id !== action.payload.message.id
      ) {
        state.groupes[index].messages.unshift(action.payload.message);
      }
    },
    onCreateGroupe: (state, action: PayloadAction<Groupe>) => {
      if (!state.groupes.find((g) => g.id === action.payload.id))
        state.groupes.unshift(action.payload);
    },
    viewMessage: (state, action: PayloadAction<any>) => {
      const index = state.groupes.findIndex(
        (g) => g.id === action.payload.groupe.id
      );
      if (index !== -1) {
        state.groupes[index].messages.forEach((m) => {
          const data = action.payload.groupe.messages.find(
            (mp: any) => mp.id === m.id
          );

          if (data) {
            const { id, ...rest } = data;
            Object.assign(
              state.groupes[index].messages.find((mc) => mc.id === m.id),
              rest
            );
          }
        });
      }
    },
    moreMessage: (state, action: PayloadAction<any>) => {
      const index = state.groupes.findIndex((g) => g.id === action.payload.id);

      if (index !== -1) {
        state.groupes[index].messages.push(...action.payload.messages);
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
  moreMessage,
  onCreateGroupe,
} = groupeSlice.actions;

export default groupeSlice.reducer;
