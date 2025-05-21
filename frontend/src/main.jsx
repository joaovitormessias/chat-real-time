import { StrictMode } from "react";
import { createRoot, } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
   /* Permitindo que a aplicação use os componentes certos do react */
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      
  </StrictMode>
);
