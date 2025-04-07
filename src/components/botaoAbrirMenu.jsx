import { useMenu } from "../context/MenuContext";
import AbrirMenuIcon from "./MenuLateral/Icones/AbrirMenu";

function BotaoAbrirMenu() {
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

export default BotaoAbrirMenu;
