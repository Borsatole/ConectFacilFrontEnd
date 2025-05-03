import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../comum/button";
import { requisicaoPost } from "../../services/requisicoes";
import Alerta from "../comum/alertas";
import { H3 } from "../tailwindComponents/Textos";
import * as React from "react";

interface Step2Props {
  sellerInfo: any;
  handleContinue: (page) => void;
  setMercadoPagoDados: any;
  handleClose: () =>  void;
};

function Step2({
  sellerInfo,
  handleContinue,
  setMercadoPagoDados,
  handleClose,
} : Step2Props) {
  const [loading, setLoading] = useState(false);
  const dadosDoUsuario = sellerInfo?.dadosDoUsuario || {};
  const dadosDaCompra = sellerInfo?.dadosDaCompra || {};

  if (dadosDaCompra.total == 0) {
    Alerta("swal", "error", "O valor total da compra não pode ser zero.");
    handleClose();
  }

  const FinalizarCompra = async () => {
    setLoading(true);
  
    const response = await requisicaoPost(
      "/Backend/Checkout/cria-pagamento.php",
      {
        cupom: dadosDaCompra.cupom,
        idProduto: dadosDaCompra.idProduto,
      }
    );
    if (!response || !response.data) {
      // handleClose();
      Alerta("swal", "error", "Erro ao conectar com o servidor.");
      return;
    }
  
    if (!response.data.success) {
      handleClose();
      Alerta("swal", "error", `${response.data.message}`);
    } else {
      setMercadoPagoDados(response.data);
      setLoading(false);
      handleContinue(3);
    }
  };
  

  return (
    <div>
      <H3> Confirmação dos dados</H3>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-lg font-semibold mb-2">Dados do Usuário</h4>
        <UsuarioInfo dados={dadosDoUsuario} />

        <h4 className="text-lg font-semibold mb-2">Dados da Venda</h4>
        <VendaInfo dados={dadosDaCompra} />

        <div className="mt-6 flex justify-end">
          <Button onClick={FinalizarCompra} loading={loading}>
            Finalizar o Pagamento
          </Button>
        </div>
      </div>
    </div>
  );
}

Step2.propTypes = {
  sellerInfo: PropTypes.object,
  setMercadoPagoDados: PropTypes.func,
  handleContinue: PropTypes.func,
  handleClose: PropTypes.func,
};

export default Step2;

// COMPONENTES INTERNOS

function UsuarioInfo({ dados }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <p className="text-sm text-gray-700 mb-2">
        Nome: {dados.nome || "Nome não informado"}
      </p>
      <p className="text-sm text-gray-700 mb-2">
        E-mail: {dados.email || "E-mail não informado"}
      </p>
      <p className="text-sm text-gray-700 mb-2">
        Contato: {dados.telefone || "Telefone não informado"}
      </p>
    </div>
  );
}

UsuarioInfo.propTypes = {
  dados: PropTypes.object.isRequired,
};

function VendaInfo({ dados }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <p className="text-sm text-gray-700 mb-2">
        Produto: {dados.titulo || "Produto não informado"}
      </p>

      {dados.desconto !== 0 && (
        <p className="text-sm text-gray-700 mb-2">
          Subtotal: {dados.subtotal || "Preço não informado"}
        </p>
      )}

      {dados.cupom && (
        <p className="text-sm text-gray-700 mb-2">Cupom: {dados.cupom}</p>
      )}

      {dados.desconto > 0 && (
        <p className="text-sm text-gray-700 mb-2">
          <span className="text-green-500 font-semibold rounded">
            DESCONTO APLICADO - R$ {(dados.desconto ?? 0).toFixed(2)}
          </span>
        </p>
      )}

      <p className="text-sm text-gray-700 mb-2">
        Total a Pagar: R$ {(dados.total ?? 0).toFixed(2)}
      </p>
    </div>
  );
}

VendaInfo.propTypes = {
  dados: PropTypes.object.isRequired,
};
