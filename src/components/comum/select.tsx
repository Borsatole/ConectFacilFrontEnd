// import PropTypes from "prop-types";
import * as React from "react";
export function Select({ selectedCoupon } : SelectProps) {
  return (
    <select
      name="tipo"
      defaultValue={selectedCoupon}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="percent">Porcentagem</option>
      <option value="valor">Valor Fixo</option>
    </select>
  );
}

type SelectProps = {
  selectedCoupon: string;
};

export default Select;
