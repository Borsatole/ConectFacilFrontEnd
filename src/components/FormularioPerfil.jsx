import axios from "axios";
import { useState, useEffect } from "react";
import { requisicaoPost } from "../services/requisicoes";

import Alerta from "./comum/alertas";
import Loading from "./Loading";
import Container from "./tailwindComponents/Container";
import { Input } from "./comum/input";
import { Label } from "./comum/label";
import { FormGroup } from "./comum/FormGroup";
import { AvatarGrid } from "./comum/gridAvatar";
import { Button } from "./comum/button";

function FormularioPerfil() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingbtn, setLoadingbtn] = useState(false);
  const [avatarSelecionado, setAvatarSelecionado] = useState("");

  const avatares = [
    "avatar1.png",
    "avatar2.png",
    "avatar3.png",
    "avatar4.png",
    "avatar5.png",
    "avatar6.png",
  ];

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await requisicaoPost(
          "/Backend/Usuario/configuracoes.php"
        );
        const dadosUsuario = response?.data?.dados;

        if (dadosUsuario) {
          setDados(dadosUsuario);
          setAvatarSelecionado(dadosUsuario.avatar || "");
        } else {
          setErro("Não foi possível carregar os dados do perfil.");
        }
      } catch (err) {
        console.error("Erro ao carregar dados do perfil:", err);
        setErro("Erro ao carregar dados do perfil.");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const handleSubmit = async (e) => {
    setLoadingbtn(true);
    e.preventDefault();
    const token = localStorage.getItem("token");
    const RotaApi = import.meta.env.VITE_API;

    const formData = {
      token,
      nome: e.target.fullName.value,
      email: e.target.email.value,
      telefone: e.target.phone.value,
      avatar: avatarSelecionado,
    };

    if (e.target.password.value) {
      formData.senha = e.target.password.value;
    }

    try {
      const response = await axios.post(
        `${RotaApi}/Backend/Usuario/atualizar_perfil.php`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        Alerta("toast", "success", "Perfil atualizado com sucesso!");
        setTimeout(() => window.location.reload(), 2200);
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setErro("Erro ao atualizar perfil.");
      Alerta(
        "toast",
        "error",
        "Falha ao atualizar o perfil. Por favor, tente novamente."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loading color="var(--corPrincipal)" />
      </div>
    );
  }

  if (erro) {
    return <div className="text-center p-6 text-red-500">{erro}</div>;
  }

  if (!dados) {
    return (
      <div className="text-center p-6">Nenhum dado de perfil disponível.</div>
    );
  }

  return (
    <Container tipo="secundario">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="avatar">Selecione seu avatar</Label>
          <AvatarGrid
            avatares={avatares}
            avatarSelecionado={avatarSelecionado}
            selecionarAvatar={setAvatarSelecionado}
          />
        </div>

        <FormGroup label="Nome Completo" id="fullName">
          <Input
            id="fullName"
            type="text"
            placeholder="Digite seu nome completo"
            defaultValue={dados.nome}
          />
        </FormGroup>

        <FormGroup label="E-mail" id="email">
          <Input
            id="email"
            type="text"
            placeholder="Digite seu e-mail"
            defaultValue={dados.email}
          />
        </FormGroup>

        <FormGroup label="Senha" id="password">
          <Input
            id="password"
            type="password"
            placeholder="Digite sua nova senha (opcional)"
            defaultValue=""
          />
        </FormGroup>

        <FormGroup label="Telefone" id="phone">
          <Input
            id="phone"
            type="tel"
            placeholder="Digite seu telefone"
            defaultValue={dados.telefone}
          />
        </FormGroup>

        <div className="flex items-center justify-between">
          <Button type="submit" loading={loadingbtn}>
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default FormularioPerfil;
