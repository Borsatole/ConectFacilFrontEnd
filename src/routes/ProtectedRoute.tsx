import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import * as React from "react";

export function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    // Adicione um fallback caso o auth ainda não esteja disponível
    return <Navigate to="/login" />;
  }

  return auth.loggedIn ? children : <Navigate to="/login" />;
}
