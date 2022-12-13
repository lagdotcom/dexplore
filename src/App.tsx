import { ChakraProvider } from "@chakra-ui/react";
import MainDisplay from "./components/MainDisplay";
import { Provider as StoreProvider } from "react-redux";
import { setupStore } from "./store";

const store = setupStore();

export default function App() {
  return (
    <ChakraProvider>
      <StoreProvider store={store}>
        <MainDisplay />
      </StoreProvider>
    </ChakraProvider>
  );
}
