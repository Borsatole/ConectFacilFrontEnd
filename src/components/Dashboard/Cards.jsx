import PropTypes from "prop-types";
import Loading from "../Loading";
import { useState } from "react";
import CheckoutModal from "../../layout/CheckoutModal";

export function CardEstatisticas(props) {
  return (
    <div
      className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 md:p-6 rounded-lg shadow-lg flex items-center text-white relative"
      style={{
        backgroundImage: "linear-gradient(161deg, #4F46E5, #2664EB)",
        cursor: "pointer",
      }}
    >
      <i className={`${props.icone} text-3xl md:text-4xl mr-4`}></i>
      <div>
        <div className="text-2xl md:text-3xl font-bold">
          {/* Exibe o spinner enquanto estiver carregando */}
          {props.loading ? (
            <Loading />
          ) : (
            props.valor // Exibe o valor se não estiver carregando
          )}
        </div>
        <p>{props.descricao}</p>
      </div>
    </div>
  );
}

CardEstatisticas.propTypes = {
  icone: PropTypes.string.isRequired,
  valor: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired, // Adicionando a prop de loading
};

export function CardRecargas({
  id = 0,
  descricaoRecarga = "",
  imgRecarga = "",
  valorRecarga = 0,
}) {
  const [showModal, setShowModal] = useState(false);

  function FinalizarCompra() {
    setShowModal(true);
  }

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
  };

  const productInfo = {
    id: id,
    title: descricaoRecarga,
    description: `Recarga para utilização no serviço solicitado (ID: ${id})`,
    price: valorRecarga.toString(), // Convertendo para string conforme esperado pelo PropTypes
    imageUrl: imgRecarga || "/api/placeholder/200/200",
  };

  return (
    <div className="flex flex-col items-center gap-y-4 rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg w-full">
      <img
        alt="Imagem de um smartphone moderno"
        className="w-24 h-24 object-cover rounded-full"
        height="150"
        src={imgRecarga}
        width="150"
      />
      <div className="text-center flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-900">{descricaoRecarga}</h3>
        <p className="text-gray-500">Valor: R${valorRecarga}</p>
        <button
          onClick={() => {
            FinalizarCompra(id);
          }}
          type="button"
          className="bg-green-600 flex items-center gap-x-2 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition mt-4"
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-bolt" aria-hidden="true"></i>
          Ativar
        </button>
      </div>

      {/* Usando o novo Modal refatorado */}
      <CheckoutModal
        isOpen={showModal}
        onClose={closeModal}
        productInfo={productInfo}
      />
    </div>
  );
}

CardRecargas.propTypes = {
  id: PropTypes.number,
  descricaoRecarga: PropTypes.string,
  imgRecarga: PropTypes.string,
  valorRecarga: PropTypes.string,
};
