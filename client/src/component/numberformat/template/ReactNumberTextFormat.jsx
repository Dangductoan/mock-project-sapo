import React from "react";
import NumberFormat from "react-number-format";

const ReactNumberTextFormat = ({ name, value, onChange }) => {
  return (
    <NumberFormat
      value={value}
      name={name}
      onChange={onChange}
      thousandsGroupStyle="thousand"
      decimalSeparator="."
      displayType="text"
      type="text"
      thousandSeparator={true}
      allowNegative={false}
    />
  );
};

export default ReactNumberTextFormat;
