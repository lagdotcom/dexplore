import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import Backdrop from "../../types/Backdrop";

export const backdropAdapter = createEntityAdapter<Backdrop>();

const slice = createSlice({
  name: "backdrops",
  initialState: backdropAdapter.getInitialState(),
  reducers: {
    addBackdrop: backdropAdapter.upsertOne,
    addBackdrops: backdropAdapter.upsertMany,
    removeBackdrop: backdropAdapter.removeOne,
    updateBackdrop: backdropAdapter.updateOne,
  },
});

export const { addBackdrop, addBackdrops, removeBackdrop, updateBackdrop } =
  slice.actions;
export default slice.reducer;
