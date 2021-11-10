import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User";
import groupeReducer from "./Groupe";

export const store = configureStore({
  reducer: {
    user: userReducer,
    groupe: groupeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
