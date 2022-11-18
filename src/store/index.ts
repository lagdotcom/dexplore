import { PreloadedState, configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer";

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({ reducer, preloadedState });
}

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
