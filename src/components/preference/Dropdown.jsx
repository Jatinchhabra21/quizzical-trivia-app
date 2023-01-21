import React, { useState, useEffect } from 'react';
import './dropdown.css';

export default function Dropdown(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.placeholderText);

  function toggle() {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  }

  function selectChoice(event) {
    setSelectedValue(event.target.dataset.value);
    setShowDropdown(false);
  }

  useEffect(() => {
    const choiceContainer = document.getElementById(
      `choice-container-${props.placeholderText}`
    );
    choiceContainer.addEventListener('click', selectChoice);
    const dropdownBtn = document.getElementById(
      `dropdown-btn-${props.placeholderText}`
    );
    dropdownBtn.addEventListener('click', toggle);

    return () => {
      dropdownBtn.removeEventListener('click', toggle);
      choiceContainer.removeEventListener('click', selectChoice);
    };
  }, []);

  return (
    <div className="dropdown-container">
      <div className={`select-box ${props.size}`}>
        <p className="selected-choice">{selectedValue}</p>
        <img
          src="src\assets\arrow-down.svg"
          className="dropdown-arrow"
          width={14}
          height={6}
          id={`dropdown-btn-${props.placeholderText}`}
        />
      </div>
      <div
        className={`choice-container ${props.size} ${
          !showDropdown && 'display-none'
        }`}
        id={`choice-container-${props.placeholderText}`}
      >
        {props.list.map((item) => (
          <p
            className="choice"
            data-value={item.value}
            data-id={item.id}
            key={item.id}
          >
            {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}
