import PropTypes from "prop-types";
import { useEffect, useState, useContext } from "react";

import { requisicaoPost } from "../../services/requisicoes";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../Loading";
import Alerta from "../comum/alertas";
import { CopiarTexto } from "../../functions/data";
import { H3, H4 } from "../tailwindComponents/Textos";

function Step3({ mercadoPagoDados, setDadosCodigo, handleClose, handleContinue }) {
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const pixCopiaEcola = mercadoPagoDados?.CopiaECola || "";
  const pixQrCode = mercadoPagoDados?.QRCodeBase64 || "";
  const paymentId = mercadoPagoDados?.paymentId || "";
  const tituloPedido = mercadoPagoDados?.tituloPedido || "";
  const total = mercadoPagoDados?.valorPagamento || 0;

  useEffect(() => {
    if (!pixCopiaEcola && !pixQrCode) {
      handleClose();
      Alerta("toast", "error", "Não foi possível gerar o Pagamento");
    }
  }, [pixCopiaEcola, pixQrCode, handleClose]);

  useEffect(() => {
    setLoading(true);

    const verificarPagamento = async () => {
      const response = await requisicaoPost("/Backend/Checkout/consulta-pedido.php", {
        idPedido: paymentId,
      });

      const pedido = response?.data?.pedido;
      if (response?.data?.success && pedido) {
        if (pedido.status !== "pendente" && pedido.codigoderecarga) {
          setDadosCodigo({
            servidor: pedido.servidor,
            codigoderecarga: pedido.codigoderecarga,
            idPedido: pedido.id,
          });
          setLoading(false);
          handleContinue(4);
        }
      }
    };

    const interval = setInterval(verificarPagamento, 3000);
    return () => clearInterval(interval);
  }, [paymentId, handleContinue, setDadosCodigo, logout]);

  return (
    <div className="p-4">
      <H3>Efetue o Pagamento</H3>

      <div className="border-t border-gray-200 pt-4">
        <H4>Código QR</H4>

        <QRCodeImage base64={pixQrCode} />

        <p className="text-center text-gray-500 mt-4 font-semibold">
          Escaneie o código QR ou copie o código e cole no seu app de pagamento
        </p>

        <h2 className="text-center text-2xl text-green-500 mt-4 font-bold">
          {tituloPedido} - R$ {total.toFixed(2)}
        </h2>

        <PixCodeTextArea value={pixCopiaEcola} />

        <div className="mt-6 flex flex-col gap-4 items-center">
          <CopyButton
            onClick={() => {
              CopiarTexto(pixCopiaEcola);
              Alerta("toast", "success", "Código Pix Copiado");
            }}
          />

          {loading && (
            <div className="flex flex-col items-center gap-2">
              <Loading color="var(--corPrincipal)" style={{ scale: "0.3" }} />
              <p className="text-sm text-gray-600">Aguardando o pagamento...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Step3.propTypes = {
  mercadoPagoDados: PropTypes.object,
  setDadosCodigo: PropTypes.func,
  handleFinish: PropTypes.func,
  handleContinue: PropTypes.func,
  handleClose: PropTypes.func,
};

// COMPONENTE INTERNO: QRCodeImage
function QRCodeImage({ base64 }) {
  if (!base64) {
    return <p className="text-center text-gray-500">QR Code não disponível</p>;
  }

  return (
    <img
      src={`data:image/png;base64,${base64}`}
      alt="Qr Code"
      className="w-80 h-80 mx-auto mt-4 shadow-lg rounded-lg object-contain"
    />
  );
}

// COMPONENTE INTERNO: PixCodeTextArea
function PixCodeTextArea({ value }) {
  return (
    <textarea
      className="w-full p-2 mt-4 border border-gray-300 rounded-md resize-none bg-gray-100"
      value={value}
      readOnly
      rows={4}
      onClick={() => {
        CopiarTexto(value);
        Alerta("toast", "success", "Código Pix Copiado");
      }}
    />
  );
}

// COMPONENTE INTERNO: CopyButton
function CopyButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors duration-300"
      style={{
        backgroundColor: "var(--corPrincipal)",
        color: "var(--corTexto1)",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--corSecundaria)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--corPrincipal)")
      }
    >
      Copiar
    </button>
  );
}

QRCodeImage.propTypes = {
  base64: PropTypes.string,
};
PixCodeTextArea.propTypes = {
  value: PropTypes.string, 
}
CopyButton.propTypes = {
  onClick: PropTypes.func, 
}

export default Step3;
