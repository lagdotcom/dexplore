import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { useDispatch } from "react-redux";

const store = configureStore({ reducer });
export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
