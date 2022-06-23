import {
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./DropDownHasSearch.css";

function DropDownHasSearch({
  hasSearch,
  onChange,
  onSearch,
  title,
  data,
  ...operators
}) {
  let className = operators.hasOwnProperty("className")
    ? operators.className
    : "";

  // Close the dropdown if the user clicks outside of it
  window.onclick = (event) => {
    if (
      !(
        event.target.classList.contains("dropdown__title") ||
        event.target.classList.contains("dropdown__icon") ||
        event.target.classList.contains("dropdown") ||
        event.target.classList.contains("searchbar__input") ||
        event.target.classList.contains("searchbar__icon") ||
        event.target.classList.contains("searchbar")
      )
    ) {
      var dropdowns = document.getElementsByClassName("dropdown__content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("dropdown-show")) {
          openDropdown.classList.remove("dropdown-show");
        }
      }
    }
  };

  return (
    <div {...operators} className={`dropdown ${className}`}>
      <div
        className="dropdown__show"
        onClick={toggleDropdown}
        onBlur={operators.onBlur}
      >
        <span className="dropdown__title" onBlur={operators.onBlur}>
          {operators.value && operators.value !== "" ? operators.value : title}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="dropdown__icon"
          onBlur={operators.onBlur}
        />
      </div>
      <ul id="dropdown-content" className="dropdown__content">
        {hasSearch && (
          <div className="searchbar">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="svg-khutx searchbar__icon"
            />
            <input
              className="searchbar__input"
              type="text"
              placeholder="Tìm kiếm"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSearch(e.target.value);
                }
              }}
            />
          </div>
        )}
        {data?.map((item, index) => (
          <li key={index} onClick={() => onChange(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function toggleDropdown() {
  document.getElementById("dropdown-content").classList.toggle("dropdown-show");
}

export default DropDownHasSearch;
