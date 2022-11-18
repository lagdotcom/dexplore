import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AppState = {
  dragging?: string;
};

const initialState: AppState = {};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDragging(state, { payload }: PayloadAction<string | undefined>) {
      state.dragging = payload;
    },
  },
});

export const { setDragging } = slice.actions;
export default slice.reducer;
