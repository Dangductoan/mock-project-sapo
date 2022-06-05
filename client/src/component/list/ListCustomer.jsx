import React, { useState } from "react";
import "./ListCustomer.css";
function ListCustomer(props) {
  const handleClick = () => {
    props.setCustomer({
      code: props.code,
      name: props.name,
      phoneNumber: props.phoneNumber,
      groupCustomer: props.groupCustomer,
      createdBy: props.createdBy,
      address: props.address,
      email:props.email
    });
    props.setShow(!props.show);
    props.setIndex(props.index);
  };

  const handleChange = (id) => {
    props.setCheck((prev) => {
      const ischecked = props.check.includes(id);
      if (ischecked) {
        return props.check.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  return (
    <div className="list">
      <div>
        <input
          className="checkCustomer"
          type="checkbox"
          onChange={() => handleChange(props.index)}
          checked={props.check.includes(props.index)}
          value=""
        />
      </div>
      <h3 className="list-item-customer" onClick={handleClick}>
        {props.code}
      </h3>
      <h3 className="list-item-customer" onClick={handleClick}>
        {props.name}
      </h3>
      <h3 className="list-item-customer" onClick={handleClick}>
        {props.phoneNumber}
      </h3>
      <h3 className="list-item-customer" onClick={handleClick}>
        {props.groupCustomer}
      </h3>
      <h3 className="list-item-customer" onClick={handleClick}>
        {props.createdBy}
      </h3>
      <h3 className="list-item-customer" onClick={handleClick}>
        {props.address}
      </h3>
      <h3 className="list-item-customer" onClick={handleClick}>
        {props.email}
      </h3>
    </div>
  );
}

export default ListCustomer;
