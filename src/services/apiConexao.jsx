import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const rotaApi = import.meta.env.VITE_API;

export function createApiService(logoutFn) {
  // Função para tratar erros relacionados ao token
  const handleTokenError = (error) => {
    // Verifica se temos uma resposta da API
    if (error.response) {
      // Verifica status code 401 (Unauthorized) ou 403 (Forbidden)
      if (error.response.status === 401 || error.response.status === 403) {
        console.log("Erro de autenticação detectado");
        if (logoutFn && typeof logoutFn === 'function') {
          logoutFn();
        }
        return;
      }
      
      // Verifica mensagens específicas na resposta
      if (error.response.data) {
        const responseData = error.response.data;
        if (responseData.error === "Token inválido" || 
            responseData.message === "Token inválido" ||
            responseData.success === false) {
          console.log("Token inválido detectado na resposta");
          if (logoutFn && typeof logoutFn === 'function') {
            logoutFn();
          }
        }
      }
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error("Sem resposta do servidor:", error.request);
    } else {
      // Algo aconteceu ao configurar a requisição
      console.error("Erro na configuração da requisição:", error.message);
    }
  };

  async function requisicaoGet(rota) {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${rotaApi}${rota}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      return response;
    } catch (error) {
      handleTokenError(error);
      throw error;
    }
  }

  async function requisicaoPost(rota, dados) {
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.post(
        `${rotaApi}${rota}`,
        { token, ...dados }, // Mantendo o token no corpo como estava no código original
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      return response;
    } catch (error) {
      handleTokenError(error);
      throw error;
    }
  }

  async function requisicaoPut(rota, dados) {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${rotaApi}${rota}`,
        { token, ...dados }, // Mantendo o token no corpo como estava no código original
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
      
      return response;
    } catch (error) {
      handleTokenError(error);
      throw error;
    }
  }

  async function requisicaoDelete(rota, dados) {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`${rotaApi}${rota}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        data: { token, ...dados } // Mantendo o token no corpo como estava no código original
      });
      
      return response;
    } catch (error) {
      handleTokenError(error);
      throw error;
    }
  }

  return {
    requisicaoGet,
    requisicaoPost,
    requisicaoPut,
    requisicaoDelete
  };
}

// Hook personalizado para ser usado dentro de componentes React
export function useApiService() {
  const { logout } = useContext(AuthContext);
  
  if (!logout) {
    console.warn("Atenção: função logout não encontrada no contexto de autenticação");
  }
  
  return createApiService(logout);
}

// Configuração de interceptor global do Axios
export function setupAxiosInterceptors(logout) {
  // Remove interceptors anteriores para evitar duplicação
  axios.interceptors.response.eject(axios.interceptors.response.handlers?.[0]);
  
  // Adiciona novo interceptor
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        // Tratamento para erros de autenticação
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("Token inválido detectado pelo interceptor");
          if (logout && typeof logout === 'function') {
            logout();
          }
        }
      }
      return Promise.reject(error);
    }
  );
}