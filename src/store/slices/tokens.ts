import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import Token from "../../types/Token";

export const tokenAdapter = createEntityAdapter<Token>();

const slice = createSlice({
  name: "tokens",
  initialState: tokenAdapter.getInitialState(),
  reducers: {
    addTokens: tokenAdapter.upsertMany,
    updateToken: tokenAdapter.updateOne,
  },
});

export const { addTokens, updateToken } = slice.actions;
export default slice.reducer;
