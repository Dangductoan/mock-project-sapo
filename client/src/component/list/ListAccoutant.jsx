import React, { useState, useRef } from "react";
import "./ListAccountant.css";
function ListAccountant(props) {
  const handleClick = () => {
    props.setAccountant({
      username: props.username,
      name: props.name,
      phoneNumber: props.phone,
      address: props.address,
    });
    props.setShow(!props.show);
    props.setIndex(props.index);
  };

  const handleChange = (id) => {
    props.setCheck(prev => {
      const ischecked = props.check.includes(id)
      if(ischecked){
        return props.check.filter(item=>item !== id)
      } else {
        return [...prev,id]
      }
    } )
  }
  console.log(props.check)
  return (
    <div className="list">
      <div className="placecheckbox">
        <input
          class="checkAccountant"
          type="checkbox"
          onChange={() => handleChange(props.index)}
          checked={props.check.includes(props.index)}
          value=""
        />
      </div>
      <h3 className="list-item" onClick={handleClick}>
        {props.name}
      </h3>
      <h3 className="list-item" onClick={handleClick}>
        {props.phone}
      </h3>
      <h3 className="list-item" onClick={handleClick}>
        {props.address}
      </h3>
      <h3 className="list-item" onClick={handleClick}>
        {props.createdAt}
      </h3>
    </div>
  );
}

export default ListAccountant;
