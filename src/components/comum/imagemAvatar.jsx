import PropTypes from 'prop-types';

export function ImgAvatar({ src = "" }) {
  return (
    <img
      alt="Avatar"
      className="rounded-full w-full object-cover"
      src={`${import.meta.env.VITE_API}/Backend/Usuario/avatar/${src}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/100x100";
      }}
    />
  );
}

ImgAvatar.propTypes = {
  src: PropTypes.string.isRequired,
};
