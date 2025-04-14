import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./StoreContext"; // Wraps the entire app with global store context
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
<StrictMode>
  <StoreProvider>
    <BrowserRouter>
      <main className="mt-18 md:mt-28">
        <App />
      </main>
    </BrowserRouter>
  </StoreProvider>
</StrictMode>
);