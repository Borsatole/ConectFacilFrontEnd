import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { H3 } from "../tailwindComponents/Textos";

function Sucess({ dadosCodigo = { servidor: "", codigoderecarga: "", idPedido: "" } }) {
  const codigo = dadosCodigo?.codigoderecarga;

  const handleCopy = () => {
    if (codigo) {
      navigator.clipboard.writeText(codigo);
      toast.success("Código copiado para a área de transferência");
    } else {
      toast.error("Contate nosso suporte");
    }
  };

  return (
    <div className="py-8 text-center">
      <CheckIcon />
      <H3>Compra Finalizada com Sucesso!</H3>
      

      <p className="text-gray-600 mb-6">
        Seu código de recarga é:
        <span className="block mt-2 font-semibold text-lg bg-gray-100 p-2 rounded-md bg-green-200 text-green-800 mx-auto">
          {codigo || "Entre em contato com o suporte"}
        </span>
        {codigo && (
          <span className="block mt-2">
            Seu código fica salvo em <strong>Meus Pedidos</strong>,
            <br />
            também enviamos o código para o seu e-mail.
          </span>
        )}
      </p>

      <button
        onClick={handleCopy}
        className="w-1/2 px-4 py-2 mt-2 text-sm font-medium text-white bg-green-600 rounded-md cursor-pointer hover:bg-green-700 transition-all duration-300"
      >
        Copiar
      </button>
    </div>
  );
}

Sucess.propTypes = {
  dadosCodigo: PropTypes.shape({
    servidor: PropTypes.string,
    codigoderecarga: PropTypes.string,
    idPedido: PropTypes.string,
  }),
};

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
