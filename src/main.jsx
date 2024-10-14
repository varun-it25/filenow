import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Send from "./Send";
import Recieve from "./Recieve";
import App from "./App";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")).render(
  <CookiesProvider>
  <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/send" element={<Send />} />
          <Route path="/recieve" element={<Recieve />} />
        </Routes>
      </Router>
  </StrictMode>
  </CookiesProvider>
);
