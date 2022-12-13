import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import Token from "../../types/Token";

export const tokenAdapter = createEntityAdapter<Token>();

const slice = createSlice({
  name: "tokens",
  initialState: tokenAdapter.getInitialState(),
  reducers: {
    addToken: tokenAdapter.upsertOne,
    addTokens: tokenAdapter.upsertMany,
    removeToken: tokenAdapter.removeOne,
    updateToken: tokenAdapter.updateOne,
  },
});

export const { addToken, addTokens, removeToken, updateToken } = slice.actions;
export default slice.reducer;
