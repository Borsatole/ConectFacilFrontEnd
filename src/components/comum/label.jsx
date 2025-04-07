import PropTypes from 'prop-types';
export function Label ({children = "", htmlFor = ""}) {
  return (
    <label
    className="block text-gray-700 text-sm font-bold mb-2"
    htmlFor={htmlFor}
  >
    {children}
  </label>
  );
}
Label.propTypes = {
  children: PropTypes.string,
  htmlFor: PropTypes.string,
}

