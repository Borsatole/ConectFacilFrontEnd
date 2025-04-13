import { H3 } from "../tailwindComponents/Textos";
import Alerta from "../comum/alertas";
import { Paragrafo } from "../tailwindComponents/Textos";
import * as React from "react";

interface SucessProps {
  dadosCodigo: {
    servidor: string;
    codigoderecarga: string;
    idPedido: string;
    handleClose?: () => void;
  };
}


function Sucess({
  dadosCodigo = { servidor: "", codigoderecarga: "", idPedido: "",  handleClose: () => {} },
} : SucessProps) {
  const codigo = dadosCodigo?.codigoderecarga;

  const handleCopy = () => {
    if (codigo) {
      navigator.clipboard.writeText(codigo);
      Alerta("toast", "success", "Código copiado para a área de transferência");
    } else {
      Alerta("toast", "error", "Contate nosso suporte");
    }
  };

  return (
    <div className="py-8 text-center">
      <CheckIcon />
      <H3>Compra Finalizada com Sucesso!</H3>
      <Paragrafo>Seus dados de acesso:</Paragrafo>

      <div className="flex items-center justify-center mx-auto max-w-xs mb-4">
        <div className="bg-green-100 border border-green-200 rounded-l-md py-2 px-4">
          <span className="font-mono font-medium text-green-800">
            {codigo || "Erro: Contate o suporte"}
          </span>
        </div>
      </div>

      {codigo && (
        <p className="text-sm text-gray-600 mt-2 mb-6">
          Seu código fica salvo em <strong>Meus Pedidos</strong>,
          <br />
          também enviamos o código para o seu e-mail.
        </p>
      )}

      <button
        onClick={handleCopy}
        className="w-1/2 px-4 py-2 mt-2 text-sm font-medium text-white bg-green-600 rounded-md cursor-pointer hover:bg-green-700 transition-all duration-300"
      >
        Copiar
      </button>
    </div>
  );
}



// Ícone de sucesso isolado em componente funcional
function CheckIcon() {
  return (
    <div className="mb-6 flex justify-center">
      <div className="bg-green-100 rounded-full p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
}

export default Sucess;
