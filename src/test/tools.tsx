import { AppStore, RootState, setupStore } from "../store";
import { PropsWithChildren, ReactElement } from "react";
import { RenderOptions, render } from "@testing-library/react";

import { ChakraProvider } from "@chakra-ui/react";
import { PreloadedState } from "@reduxjs/toolkit";
import { Provider as StoreProvider } from "react-redux";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <ChakraProvider>
        <StoreProvider store={store}>{children}</StoreProvider>
      </ChakraProvider>
    );
  }

  return { store, ...render(ui, { wrapper, ...renderOptions }) };
}
