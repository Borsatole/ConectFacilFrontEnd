import PropTypes from "prop-types";
export function Input({
  id = "",
  type = "text",
  placeholder = "",
  defaultValue = "",
  autoComplete = "off",
  min = "",
  max = "",
  required = false,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder || ""}
      autoComplete={autoComplete}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      defaultValue={defaultValue || ""}
      min={min}
      max={max}
      required={required}
    />
  );
}
Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  min: PropTypes.string,
  max: PropTypes.string,
};

export function Checkbox(defaultChecked = false, name = "") {
  return (
    <input
      type="checkbox"
      name={name}
      defaultChecked={defaultChecked}
      className="mr-2 leading-tight"
    />
  );
}
