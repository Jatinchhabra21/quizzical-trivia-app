import React, { useEffect, useState } from 'react';
import './number-input.css';
import arrowUp from '/src/assets/arrow-up.svg';
import arrowDown from '/src/assets/arrow-down.svg';

export default function NumberInput() {
  const [number, setNumber] = useState(5);

  useEffect(() => {
    const arrowUp = document.getElementById('increase');
    const arrowDown = document.getElementById('decrease');
    arrowUp.addEventListener('click', increment);
    arrowDown.addEventListener('click', decrement);

    return () => {
      arrowDown.removeEventListener('click', decrement);
      arrowUp.removeEventListener('click', increment);
    };
  }, []);

  function increment() {
    setNumber((prevNumber) =>
      prevNumber === 20 ? prevNumber : prevNumber + 5
    );
  }

  function decrement() {
    setNumber((prevNumber) => (prevNumber === 5 ? prevNumber : prevNumber - 5));
  }

  return (
    <div className="input-container">
      <p className="number">{number}</p>
      <img
        src={arrowDown}
        className="arrow-down"
        id="decrease"
        width={14}
        height={6}
      />
      <img
        src={arrowUp}
        className="arrow-up"
        id="increase"
        width={14}
        height={6}
      />
    </div>
  );
}
