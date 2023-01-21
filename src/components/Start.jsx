import React from 'react';
import './start.css';
import { Link } from 'react-router-dom';

export default function Start() {
  return (
    <div className="container">
      <h1 className="start__title">Quizzical</h1>
      <h5 className="start__sub-title">A Trivia App</h5>
      <Link to="/preference">
        <button className="btn-large">Get Started</button>
      </Link>
    </div>
  );
}
