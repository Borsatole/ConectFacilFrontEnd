import PropTypes from "prop-types";

export function TituloPagina({ children }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{children}</h1>
    </div>
  );
}

TituloPagina.propTypes = {
  children: PropTypes.node,
};

export function H2({ children }) {
  return (
    <h2 className="text-2xl font-bold text-gray-900 text-left mb-8">
      {children}
    </h2>
  );
}

H2.propTypes = {
  children: PropTypes.node,
};
