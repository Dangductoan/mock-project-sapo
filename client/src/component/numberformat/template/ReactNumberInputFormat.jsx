import React from "react";
import NumberFormat from "react-number-format";

const ReactNumberInputFormat = ({ name, value, onChange }) => {
  return (
    <NumberFormat
      value={value}
      name={name}
      onChange={onChange}
      thousandsGroupStyle="thousand"
      decimalSeparator="."
      displayType="input"
      type="text"
      thousandSeparator={true}
      allowNegative={false}
    />
  );
};

export default ReactNumberInputFormat;