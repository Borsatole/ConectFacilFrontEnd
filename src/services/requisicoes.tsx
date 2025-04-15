import axios from "axios";
import * as React from "react";

const rotaApi = import.meta.env.VITE_API;

export async function requisicaoGet(rota: string) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${rotaApi}${rota}`,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.success === true) {
      return response;
    } else {
      if (response.data.error === "Token inválido") {
        window.location.href = "/login";
      }

      return response;
    }
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}

export async function requisicaoPost(rota: string, dados: Record<string, any>) {
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

    if (response.status === 200 && response.data.success === true) {
      return response;
    } else {
      if (response.data.error === "Token inválido") {
        window.location.href = "/login";
      }

      return response;
    }
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}

export async function requisicaoPut(rota: string, dados: Record<string, any>) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${rotaApi}${rota}`,
      { token, ...dados },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data.success === true) {
      return response;
    } else {
      if (response.data.error === "Token inválido") {
        window.location.href = "/login";
      }

      return response;
    }
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}

export async function requisicaoDelete(rota: string, dados: Record<string, any>) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${rotaApi}${rota}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { token, ...dados },
    });

    if (response.status === 200 && response.data.success === true) {
      return response;
    } else {
      if (response.data.error === "Token inválido") {
        window.location.href = "/login";
      }

      return response;
    }
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}
