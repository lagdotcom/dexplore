import MainDisplay from "./components/MainDisplay";
import { Provider as StoreProvider } from "react-redux";
import { setupStore } from "./store";

const store = setupStore();

export default function App() {
  return (
    <StoreProvider store={store}>
      <MainDisplay />
    </StoreProvider>
  );
}
