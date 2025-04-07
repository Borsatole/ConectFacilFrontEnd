import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import Loading from "../components/Loading";

const TelaLogin = lazy(() => import("./telaLogin"));
const Dashboard = lazy(() => import("./Dashboard"));
const MeusPedidos = lazy(() => import("./MeusPedidos"));
const Perfil = lazy(() => import("./Perfil"));
const Admin = lazy(() => import("./Admin"));

const Rotas = () => {
  return (
    <Suspense
      fallback={
        <div>
          <h1>Carregando...</h1>
          <Loading color="var(--corPrincipal)" />
        </div>
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<TelaLogin />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <MeusPedidos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Rotas;
