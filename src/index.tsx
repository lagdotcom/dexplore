import "./index.css";

import App from "./App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("app");
if (!container) throw new Error("app container missing");

const root = createRoot(container);
root.render(<App />);
