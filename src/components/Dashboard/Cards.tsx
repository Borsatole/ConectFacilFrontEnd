
import { useState } from "react";
import Loading from "../Loading";
import CheckoutModal from "../../layout/CheckoutModal";
import * as React from "react";

// Props do CardEstatisticas
interface CardEstatisticasProps {
  icone: string;
  valor: string;
  descricao: string;
  loading: boolean;
}

export function CardEstatisticas({
  icone,
  valor,
  descricao,
  loading,
}: CardEstatisticasProps) {
  return (
    <div
      className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 md:p-6 rounded-lg shadow-lg flex items-center text-white relative"
      style={{
        backgroundImage: "linear-gradient(161deg, #4F46E5, #2664EB)",
        cursor: "pointer",
      }}
    >
      <i className={`${icone} text-3xl md:text-4xl mr-4`}></i>
      <div>
        <div className="text-2xl md:text-3xl font-bold">
          {loading ? <Loading /> : valor}
        </div>
        <p>{descricao}</p>
      </div>
    </div>
  );
}

interface CardRecargasProps {
  id?: number;
  descricaoRecarga?: string;
  imgRecarga?: string;
  valorRecarga: number;
}


export function CardRecargas({
  id = 0,
  descricaoRecarga = "",
  imgRecarga = "",
  valorRecarga = 0,
}: CardRecargasProps) {
  const [showModal, setShowModal] = useState(false);

  const handleFinalizarCompra = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const productInfo = {
    id,
    title: descricaoRecarga,
    description: `Recarga para utilização no serviço solicitado (ID: ${id})`,
    price: valorRecarga.toFixed(2), // formatado para 2 casas decimais
    imageUrl: imgRecarga || "/api/placeholder/200/200",
  };

  

  return (
    <div className="flex flex-col items-center gap-y-4 rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg w-full">
      <img
        alt={`Imagem de ${descricaoRecarga || ""}`}
        className="w-24 h-24 object-cover rounded-full"
        height="150"
        src={imgRecarga || ""}
        width="150"
      />
      <div className="text-center flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-900">{descricaoRecarga}</h3>
        <p className="text-gray-500"> Valor: R${Number(valorRecarga).toFixed(2) || "Erro"}</p>
        <button
          onClick={handleFinalizarCompra}
          type="button"
          className="bg-green-600 flex items-center gap-x-2 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition mt-4"
        >
          <i className="fa fa-bolt" aria-hidden="true"></i>
          Ativar
        </button>
      </div>

      <CheckoutModal
        isOpen={showModal}
        onClose={handleCloseModal}
        productInfo={productInfo}
      />
    </div>
  );
}
