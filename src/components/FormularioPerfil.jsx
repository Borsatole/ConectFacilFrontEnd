import axios from "axios";
import { requisicaoGet } from "../services/requisicoes";
import { useState, useEffect } from "react";
import Alerta from "./comum/alertas";
import Loading from "./Loading";
import Container from "./tailwindComponents/Container";
import { Input } from "./comum/input";
import { Label } from "./comum/label";
import { FormGroup } from "./comum/FormGroup";
import { AvatarGrid } from "./comum/gridAvatar";

function FormularioPerfil() {
  const [dadosRecebidosFormulario, setDadosRecebidosFormulario] =
    useState(null);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);
  // Lista fixa de avatares disponíveis
  const [avatares] = useState([
    "avatar1.png",
    "avatar2.png",
    "avatar3.png",
    "avatar4.png",
    "avatar5.png",
    "avatar6.png",
  ]);
  const [avatarSelecionado, setAvatarSelecionado] = useState("");

  useEffect(() => {
    const carregarDados = async () => {
      const response = await requisicaoGet(
        "/Backend/Usuario/configuracoes.php"
      );

      if (response) {
        setDadosRecebidosFormulario(response.data.dados);
        setAvatarSelecionado(response.data.dados.avatar || "");
      }

      setLoading(false);
    };

    carregarDados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const RotaApi = import.meta.env.VITE_API;

    try {
      const formData = {
        token: token,
        nome: e.target.fullName.value,
        email: e.target.email.value,
        telefone: e.target.phone.value,
        avatar: avatarSelecionado,
      };

      // Incluir senha apenas se tiver sido preenchida
      if (e.target.password.value) {
        formData.senha = e.target.password.value;
      }

      console.log("Dados do formulário:", formData);

      const response = await axios.post(
        `${RotaApi}/Backend/Usuario/atualizar_perfil.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Alerta("toast", "success", "Perfil atualizado com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    } catch (error) {
      setErro("Erro ao atualizar perfil.");
      console.error("Erro ao atualizar perfil:", error);
      Alerta(
        "toast",
        "error",
        "Falha ao atualizar o perfil. Por favor, tente novamente."
      );
    }
  };

  // Função para selecionar um avatar
  const selecionarAvatar = (avatar) => {
    setAvatarSelecionado(avatar);
  };

  // Mostra mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <div className="flex justify-center">
        <Loading color="var(--corPrincipal)" />
      </div>
    );
  }

  // Mostra mensagem de erro se ocorrer algum problema
  if (erro) {
    return <div className="text-center p-6 text-red-500">{erro}</div>;
  }

  return (
    <Container tipo={"secundario"}>
      {dadosRecebidosFormulario ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
          <Label htmlFor="avatar">Selecione seu avatar</Label>
            <AvatarGrid
              avatares={avatares}
              avatarSelecionado={avatarSelecionado}
              selecionarAvatar={selecionarAvatar}
            />

            
          </div>

          

          <FormGroup label="Nome Completo" id="fullName">
              <Input
                id="fullName"
                type="text"
                placeholder="Digite seu nome completo"
                defaultValue={dadosRecebidosFormulario.nome}
              />
            </FormGroup>
            
          <FormGroup label="E-mail" id="email">
              <Input
                id="email"
                type="text"
                placeholder="Digite seu nome completo"
                defaultValue={dadosRecebidosFormulario.email}
              />
            </FormGroup>

            <FormGroup label="Senha" id="password">
              <Input
                id="password"
                type="password"
                placeholder="Digite sua nova senha (deixe em branco para manter a atual)"
                defaultValue={''}
              />
            </FormGroup>


            <FormGroup label="phone" id="telefone">
              <Input
                id="phone"
                type="tel"
                placeholder="Digite seu telefone"
                defaultValue={dadosRecebidosFormulario.telefone}
              />
            </FormGroup>
          

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-green-600 rounded-md cursor-pointer"
              style={{
                backgroundColor: "var(--corPrincipal)",
                color: "var(--corTexto1)",
              }}
            >
              Salvar
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center p-6">
          Nenhum dado de perfil disponível. Por favor, faça login novamente.
        </div>
      )}
    </Container>
  );
}

export default FormularioPerfil;
