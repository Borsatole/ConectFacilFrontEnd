import axios from "axios";
import * as React from "react";

const rotaApi = import.meta.env.VITE_API;

export async function requisicaoGet(rota) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${rotaApi}${rota}`,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      
      return response;
    }

    else {
      console.error("Erro na requisição:", response.statusText);
      return null;
    }
    
  } catch (error) {
    
    console.error("Erro na verificação do token:", error);
    return null;
  }
}

export async function requisicaoPost(rota, dados) {
  
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${rotaApi}${rota}`,
      { token, ...dados },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    
    if (response.status === 200 && response.data.success == true) {
      return response;
    } else {
      if (response.data.error == "Token inválido") {
        window.location.href = "/login";
      }
      
      
      return response;
    }
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}

export async function requisicaoPut(rota, dados) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${rotaApi}${rota}`,
      { token,...dados },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );   
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Erro na requisição:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    return null;
  }
}

export async function requisicaoDelete(rota, dados) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${rotaApi}${rota}`,
      { token,...dados },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );   
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Erro na requisição:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    return null;
  }
}

