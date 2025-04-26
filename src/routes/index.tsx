import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import Loading from "../components/Loading";



const TelaLogin = lazy(() => import("./telaLogin"));
const Register = lazy(() => import("./Register"));

const Dashboard = lazy(() => import("./Dashboard"));
const MeusPedidos = lazy(() => import("./MeusPedidos"));
const Perfil = lazy(() => import("./Perfil"));
const Admin = lazy(() => import("./Admin"));

const Rotas = () => {
  return (
    <Suspense
      fallback={
        <TelaLoading />
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
        <Route path="/register" element={<Register />} />

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

function TelaLoading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <Loading color="var(--corPrincipal)" />
        <span className="text-gray-600 text-sm animate-pulse">Carregando...</span>
      </div>
    </div>
  );
}


export default Rotas;
