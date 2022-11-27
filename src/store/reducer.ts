import app from "./slices/app";
import backdrops from "./slices/backdrops";
import { combineReducers } from "@reduxjs/toolkit";
import tokens from "./slices/tokens";

const reducer = combineReducers({ app, backdrops, tokens });
export default reducer;

export type RootState = ReturnType<typeof reducer>;
