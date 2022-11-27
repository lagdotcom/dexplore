import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import Backdrop from "../../types/Backdrop";

export const backdropAdapter = createEntityAdapter<Backdrop>();

const slice = createSlice({
  name: "backdrops",
  initialState: backdropAdapter.getInitialState(),
  reducers: {
    addBackdrop: backdropAdapter.upsertOne,
    addBackdrops: backdropAdapter.upsertMany,
    updateBackdrop: backdropAdapter.updateOne,
  },
});

export const { addBackdrop, addBackdrops, updateBackdrop } = slice.actions;
export default slice.reducer;
