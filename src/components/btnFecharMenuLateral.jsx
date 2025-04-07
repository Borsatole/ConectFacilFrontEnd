import FecharMenuIcon from "./MenuLateral/Icones/FecharMenu";
import PropTypes from "prop-types";

function BtnFecharMenuLateral({ funcao = () => {} }) {
  return (
    <button
      id="botao-fechar-menu"
      onClick={() => funcao()}
      className="absolute right-4 top-4 p-2 text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
    >
      <FecharMenuIcon />
    </button>
  );
}

BtnFecharMenuLateral.propTypes = {
  funcao: PropTypes.func,
};

export default BtnFecharMenuLateral;
