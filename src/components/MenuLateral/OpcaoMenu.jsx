import PropTypes from "prop-types";

function OpcaoMenu({ nome = "", svg = "", rota = "#" }) {
  return (
    <a
      className="flex items-center px-4 py-2 mt-5 text-white rounded-lg hvPrincipal"
      href={rota}
    >
      {svg}
      <span className="mx-4 font-medium">{nome}</span>
    </a>
  );
}

OpcaoMenu.propTypes = {
  nome: PropTypes.string,
  svg: PropTypes.node,
  rota: PropTypes.string,
};

export default OpcaoMenu;
