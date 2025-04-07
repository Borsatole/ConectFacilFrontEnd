import propTypes from "prop-types";

function Container({ children, tipo = "principal" }) {
  let id = "conteudo";

  if (tipo == "principal") {
    return (
      <div className="w-full min-h-screen p-4 md:p-10 bg-gray-100" id={id}>
        {children}
      </div>
    );
  }

  if (tipo == "secundario") {
    return (
      <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        {children}
      </div>
    );
  }
}

export default Container;

Container.propTypes = {
  children: propTypes.node,
  tipo: propTypes.string,
  id: propTypes.string,
};
