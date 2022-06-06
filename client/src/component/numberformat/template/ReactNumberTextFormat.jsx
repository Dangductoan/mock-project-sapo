import React from "react";
import NumberFormat from "react-number-format";

const ReactNumberTextFormat = ({ value }) => {
  return (
    <NumberFormat
      value={value}
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
