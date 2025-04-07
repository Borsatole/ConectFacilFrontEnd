import PropTypes from 'prop-types';
export function Input ({id = "", type = "text", placeholder = "", defaultValue = "", autoComplete = "off"}) {
  return (
    <input
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={defaultValue}
                
    />
  );
}
Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string, 
  autoComplete: PropTypes.string,
  defaultValue: PropTypes.string,
}

