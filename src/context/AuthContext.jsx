import { createContext, useState, useEffect } from "react";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/comum/alertas";
import { requisicaoPost } from "../services/requisicoes";

// Criando o contexto de autenticação
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    loggedIn: !!localStorage.getItem("token"),
  });

  // Verifica o token ao iniciar
  useEffect(() => {
    if (auth.token) {
      verificaToken(auth.token);
    }
  }, [auth.token, verificaToken]); // Só executa quando o token muda

  // Função para validar o token na API
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function verificaToken(token) {
    try {
      const response = await requisicaoPost(
        `/Backend/Auth/Token/valida-jwt.php`,
        { token }
      );

      if (!response.data.success) {
        Alerta("swal", "error", `${response.data.error}`);
        logout();
      }
    } catch (e) {
      Alerta("swal", "error", `${e}`);
      logout();
    }
  }

  // Função para realizar login e armazenar o token
  const login = (token) => {
    localStorage.setItem("token", token);
    setAuth({ token, loggedIn: true });
  };

  // Função para logout com redirecionamento correto
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, loggedIn: false });

    // Evita erros de navegação antes da atualização do estado
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
