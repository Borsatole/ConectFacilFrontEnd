import { useMenu } from "../../context/MenuContext";
import AbrirMenuIcon from "../MenuLateral/Icones/AbrirMenu";
import FecharMenuIcon from "../MenuLateral/Icones/FecharMenu";
import PropTypes from "prop-types";

export function BtnAbrirMenuLateral() {
  const { abrirMenu } = useMenu();
  return (
    <div id="botao-abrir-menu">
      <button
        onClick={abrirMenu}
        className="left-0 p-1 text-white rounded-r-lg hover:bg-gray-200 transition-all cursor-pointer"
      >
        <AbrirMenuIcon />
      </button>
    </div>
  );
}

export function BtnFecharMenuLateral({ funcao = () => {} }) {
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
