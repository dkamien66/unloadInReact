import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./frontend/styles.css";

import App from "./frontend/App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);