import PropTypes from "prop-types";
import Loading from "../Loading";
import Alerta from "./alertas";

export function Button({
  children,
  type = "button",
  onClick = () => {},
  loading = false,
  wsize = "w-full",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={`${wsize} px-4 py-2 mt-2 text-sm font-medium text-white bg-green-600 rounded-md cursor-pointer`}
      style={{
        backgroundColor: "var(--corPrincipal)",
        color: "var(--corTexto1)",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--corSecundaria)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--corPrincipal)")
      }
    >
      {loading ? (
        <div className="flex items-center justify-center max-h-6 scale-65">
          <Loading />
        </div>
      ) : (
        children
      )}
    </button>
  );
}

Button.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  wsize: PropTypes.string,
};

export function ButtonCopy({ codigo }) {
  return (
    <button
      onClick={() => copiarCodigo(codigo)}
      style={{
        cursor: "pointer",
        color: "var(--color-green-500)",
        fontSize: "1.3rem",
      }}
    >
      <i className="fas fa-copy"></i>
    </button>
  );

  function copiarCodigo(codigo) {
    navigator.clipboard.writeText(codigo);
    Alerta("toast", "success", `Código copiado: ${codigo}`);
  }
}
ButtonCopy.propTypes = {
  codigo: PropTypes.string,
};

export function ButtonCloseModal({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

ButtonCloseModal.propTypes = {
  onClick: PropTypes.func,
};
