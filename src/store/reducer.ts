import app from "./slices/app";
import { combineReducers } from "@reduxjs/toolkit";
import tokens from "./slices/tokens";

const reducer = combineReducers({ app, tokens });
export default reducer;

export type RootState = ReturnType<typeof reducer>;
