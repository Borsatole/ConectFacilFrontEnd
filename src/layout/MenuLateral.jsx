import { useContext, useState, useEffect } from "react";
import { requisicaoPost } from "../services/requisicoes";
import { AuthContext } from "../context/AuthContext";
import { useMenu } from "../context/MenuContext";

import Swal from "sweetalert2";
import Loading from "../components/Loading";
import OpcaoMenu from "../components/MenuLateral/OpcaoMenu";
import { BtnFecharMenuLateral } from "../components/MenuLateral/botoesMenu";

// Ícones
import MenuLateralDashboard from "../components/MenuLateral/Icones/Dashboard";
import MenuLateralMeusPedidos from "../components/MenuLateral/Icones/MeusPedidos";
import MenuLateralPerfil from "../components/MenuLateral/Icones/menuLateralPerfil";

// Estilo
import "../assets/css/MenuLateral.css";
import MenuLateralAdmin from "../components/MenuLateral/Icones/MenuLateralAdmin";

const MenuLateral = () => {
  const { logout } = useContext(AuthContext);
  const { menuAberto, fecharMenu } = useMenu();

  const [loading, setLoading] = useState(true);
  const [dadosMenuLateral, setDadosMenuLateral] = useState({
    avatar: "",
    nome: "",
    email: "",
    tipoDeUsuario: "",
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const RotaApi = import.meta.env.VITE_API;
      const response = await requisicaoPost("/Backend/Usuario/Dashboard.php");

      if (response?.data?.InformacoesBasicas) {
        const info = response.data.InformacoesBasicas;
        setDadosMenuLateral({
          avatar: `${RotaApi}/Backend/Usuario/avatar/${info.Avatar}`,
          nome: info.NomeDoUsuario,
          email: info.email,
          tipoDeUsuario: info.TipoDeUsuario,
        });
      }
    } catch (error) {
      console.error("Erro ao carregar dados do menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const ConfirmSair = () => {
    Swal.fire({
      title: "Deseja realmente sair?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#655CC9",
      cancelButtonColor: "#929292",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <aside
      className={`flex flex-col h-screen px-4 py-8 overflow-y-auto corPrincipalBg menu-lateral ${
        menuAberto ? "menu-aberto" : ""
      }`}
      style={{ backgroundImage: "linear-gradient(161deg, #4F46E5, #2664EB)" }}
    >
      <BtnFecharMenuLateral funcao={fecharMenu} />

      <div className="flex flex-col items-center mt-6 -mx-2">
        {loading ? (
          <div className="w-24 h-24 rounded-full bg-gray-400 animate-pulse flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <img
            className="object-cover w-24 h-24 rounded-full"
            src={dadosMenuLateral.avatar}
            alt="Avatar do usuário"
          />
        )}

        <h4 className="mt-2 font-medium text-white">{dadosMenuLateral.nome}</h4>
        <p className="text-sm font-medium text-gray-300">
          {dadosMenuLateral.email}
        </p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <OpcaoMenu
            nome="Dashboard"
            rota="/dashboard"
            svg={<MenuLateralDashboard />}
          />
          <OpcaoMenu
            nome="Meus Pedidos"
            rota="/pedidos"
            svg={<MenuLateralMeusPedidos />}
          />
          <OpcaoMenu nome="Perfil" rota="/perfil" svg={<MenuLateralPerfil />} />

          {/* Caso seja admin */}
          {dadosMenuLateral.tipoDeUsuario === "admin" && (
            <OpcaoMenu
              nome="Administrador"
              rota="/admin"
              svg={<MenuLateralAdmin />}
            />
          )}

          <hr className="my-8 border-gray-300" />

          <button
            onClick={ConfirmSair}
            className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700 rounded-lg hvPrincipal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default MenuLateral;
