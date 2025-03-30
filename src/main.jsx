import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { FavoritesProvider } from "./context/FavoriteContext";
import { CompareProvider } from './context/CompareContext'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <FavoritesProvider>
          <CompareProvider>
            <App />
          </CompareProvider>
        </FavoritesProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
