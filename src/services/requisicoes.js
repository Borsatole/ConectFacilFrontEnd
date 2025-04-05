import axios from "axios";

const rotaApi = import.meta.env.VITE_API;

export async function requisicaoGet(rota) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${rotaApi}${rota}`,
      { token },
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
