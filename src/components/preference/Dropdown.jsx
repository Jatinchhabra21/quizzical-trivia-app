import React, { useState, useEffect } from 'react';
import arrowDown from '/src/assets/arrow-down.svg';
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

  // to store user preference of difficulty/category in session storage which can be
  // retrieved later in quiz route to get user preffered trivia questions
  useEffect(() => {
    sessionStorage.setItem(
      props.placeholderText,
      JSON.stringify(selectedValue)
    );
  }, [selectedValue]);

  function closeDropdown(event) {
    if (
      !event.target.parentElement.classList.contains(
        `dropdown-${props.placeholderText}`
      )
    ) {
      setShowDropdown(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div className={`dropdown-container dropdown-${props.placeholderText}`}>
      <div
        className={`select-box ${props.size} dropdown-${props.placeholderText}`}
        onClick={toggle}
      >
        <p className="selected-choice">{selectedValue}</p>
        <img
          src={arrowDown}
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
            onClick={selectChoice}
          >
            {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}
