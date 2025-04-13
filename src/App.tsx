import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import Rotas from "./routes";
import * as React from "react";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <MenuProvider>
          <Rotas />
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
