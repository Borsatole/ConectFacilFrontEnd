import { useMenu } from "../../context/MenuContext";
import AbrirMenuIcon from "./Icones/AbrirMenu";
import FecharMenuIcon from "./Icones/FecharMenu";

import * as React from "react";

interface BtnAbrirMenuLateralProps {
  abrirMenu: () => void;
  fecharMenu: () => void;
  menuAberto: boolean;

}

export function BtnAbrirMenuLateral(props: BtnAbrirMenuLateralProps) {
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

interface BtnFecharMenuLateralProps {
  funcao: () => void;
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

