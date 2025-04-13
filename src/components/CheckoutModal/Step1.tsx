import { requisicaoPost } from "../../services/requisicoes";
import PropTypes from "prop-types";
import { Button } from "../comum/button";
import Alerta from "../comum/alertas";
import { H3 } from "../tailwindComponents/Textos";
import { useState } from "react";
import * as React from "react";

interface Step1Props {
  setSellerInfo: any;
  productInfo: any;
  handleContinue: (nxpage) => void;
  handleClose: () => void;
  handleChangeCupom: any;
  cupom: any;
}
function Step1({
  setSellerInfo,
  productInfo,
  handleContinue,
  handleChangeCupom,
  cupom,
} : Step1Props) {
  const [loading, setLoading] = useState(false);
  async function EnviarDados() {
    setLoading(true);
    try {
      const handleRequisicao = await requisicaoPost(
        "/Backend/Checkout/cupons/cupons.php",
        {
          cupom: cupom,
          idProduto: productInfo.id,
        }
      );
  
      if (handleRequisicao?.data?.success === true) {
        setSellerInfo(handleRequisicao.data);
        handleContinue(2);
      } else {
        Alerta("swal", "error", handleRequisicao?.data?.message || "Erro ao validar cupom.");
      }
    } catch (error) {
      Alerta("swal", "error", "Erro na requisição");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div>
      <H3>Compre e Receba na hora!</H3>

      <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row md:space-x-6 mb-6">
        <RecargaImage
          imageUrl={productInfo.imageUrl}
          title={productInfo.title}
        />
        <RecargaInfo
          title={productInfo.title}
          description={productInfo.description}
          price={productInfo.price}
        />
      </div>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Você tem um cupom de desconto?
        </p>

        <div className="mt-2">
          <input
            type="text"
            placeholder="Digite o código do cupom"
            value={cupom}
            onChange={handleChangeCupom}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => EnviarDados()} loading={loading}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

Step1.propTypes = {
  productInfo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  sellerInfo: PropTypes.object,
  setSellerInfo: PropTypes.func,
  handleContinue: PropTypes.func,
  handleChangeCupom: PropTypes.func,
  cupom: PropTypes.string,
  desconto: PropTypes.number,
};

export default Step1;

// COMPONENTES INTERNOS

function RecargaImage({ imageUrl, title }) {
  return (
    <div className="md:w-1/3 mb-4 md:mb-0 flex justify-center">
      <img
        src={imageUrl}
        alt={title}
        className="rounded-lg object-contain w-full max-w-xs"
        style={{ maxWidth: "30vw" }}
      />
    </div>
  );
}

RecargaImage.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
};

function RecargaInfo({ title, description, price }) {
  return (
    <div className="md:w-2/3">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-700 mb-3">{description}</p>
      <p className="text-2xl font-bold text-green-600 mb-4">R$ {price}</p>

      <div className="bg-gray-100 p-4 rounded-lg mb-1">
        <h5 className="font-medium mb-2">Informações importantes:</h5>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li>Seu código fica salvo em Meus pedidos</li>
          <li>Entrega também por e-mail</li>
        </ul>
      </div>
    </div>
  );
}

RecargaInfo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
};
