import { useContext } from "react";
import { requisicaoGet } from "../services/requisicoes";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMenu } from "../context/MenuContext";

import "../assets/css/MenuLateral.css";
import Swal from "sweetalert2";
import { BtnFecharMenuLateral} from "../components/MenuLateral/botoesMenu";
import Loading from "../components/Loading";
import OpcaoMenu from "../components/MenuLateral/OpcaoMenu";

// Importando Icones
import MenuLateralDashboard from "../components/MenuLateral/Icones/Dashboard";
import MenuLateralMeusPedidos from "../components/MenuLateral/Icones/MeusPedidos";
import MenuLateralPerfil from "../components/MenuLateral/Icones/menuLateralPerfil";

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
    const RotaApi = import.meta.env.VITE_API;
    const carregarDados = async () => {
      const response = await requisicaoGet("/Backend/Usuario/Dashboard.php");

      if (response) {
        setDadosMenuLateral({
          avatar: `${RotaApi}/Backend/Usuario/avatar/${response.data.InformacoesBasicas.Avatar}`,
          nome: response.data.InformacoesBasicas.NomeDoUsuario,
          email: response.data.InformacoesBasicas.email,
          tipoDeUsuario: response.data.InformacoesBasicas.TipoDeUsuario,
        });
      }
      setLoading(false);
    };

    carregarDados();
  }, []);

  function ConfirmSair() {
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
        logout(); // Chama a função de logout
      }
    });
  }
  return (
    <>
      <aside
        className={`flex flex-col h-screen px-4 py-8 overflow-y-auto corPrincipalBg menu-lateral ${
          menuAberto ? "menu-aberto" : ""
        }`}
        style={{ backgroundImage: "linear-gradient(161deg, #4F46E5, #2664EB)" }}
      >
        <BtnFecharMenuLateral funcao={fecharMenu} />

        <div className="flex flex-col items-center mt-6 -mx-2">
          {loading ? (
            <div className="w-24 h-24 mx-2 rounded-full bg-gray-400 animate-pulse flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <img
              className="object-cover w-24 h-24 mx-2 rounded-full"
              src={dadosMenuLateral.avatar}
              alt="Avatar"
            />
          )}

          <h4 className="mx-2 mt-2 font-medium text-white">
            {dadosMenuLateral.nome}
          </h4>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-400">
            {String(dadosMenuLateral.email)}
          </p>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6 ">
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

            <OpcaoMenu
              nome="Perfil"
              rota="/perfil"
              svg={<MenuLateralPerfil />}
            />

            {dadosMenuLateral.tipoDeUsuario === "admin" && (
              <a
                className="flex items-center px-4 py-2 mt-5 text-white hover:bg-gray-100 hover:text-gray-700 rounded-lg hvPrincipal"
                href="/admin"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="mx-4 font-medium">Admin</span>
              </a>
            )}

            <hr className="my-8 border-gray-200 dark:border-gray-300"></hr>

            <a
              className="flex items-center px-4 py-2 mt-5 text-white hover:bg-gray-100 hover:text-gray-700 rounded-lg hvPrincipal"
              href="#"
              onClick={ConfirmSair}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mx-4 font-medium">Logout</span>
            </a>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default MenuLateral;
