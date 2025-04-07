import propTypes from "prop-types";

function ContainerPrincipal({ children }) {
  return (
    <div className="w-full min-h-screen p-4 md:p-10 bg-gray-100" id="conteudo">
      {children}
    </div>
  );
}

export default ContainerPrincipal;

ContainerPrincipal.propTypes = {
  children: propTypes.node,
};
