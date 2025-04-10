import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useMenu } from "../context/MenuContext";
import Alerta from "../components/comum/alertas";
import { Button } from "../components/comum/button";

export default function TelaLogin() {
  document.title = "Acesse sua conta";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const { login } = useContext(AuthContext); // Obtém a função login do contexto
  const { fecharMenu } = useMenu();

  async function verificaLogin(event) {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dadosFormularioLogin = Object.fromEntries(formData.entries());
    const RotaApi = import.meta.env.VITE_API;

    try {
      
      const response = await axios.post(
        `${RotaApi}/Backend/Auth/login.php`,
        dadosFormularioLogin
      );

      if (response.data.JWT) {
        

        Alerta("swal", "success", `${response.data.successMessage}`);
        

        fecharMenu();
        login(response.data.JWT);

        // Redireciona para o Dashboard
        navigate("/dashboard");
      } else {
        Alerta("swal", "error", `${response.data.erroMessage}`);
        
      }
    } catch (error) {

      if (error.code == "ERR_NETWORK") {
        Alerta("swal", "error", "Não foi possível conectar ao servidor.");
        return;
      }

      
      Alerta("swal", "error", `${error.message}`);
  
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="h-full">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="/images/logo.png"
              className="mx-auto h-20 w-auto"
            />
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" id="formLogin" onSubmit={verificaLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-left font-medium text-gray-900"
                >
                  E-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-left font-medium text-gray-900"
                  >
                    Senha
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <Button type="submit" loading={loading} >
                  Acessar
                </Button>
                
              </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Não tem cadastro?{" "}
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
