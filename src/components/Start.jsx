import React from 'react';
import './start.css';

export default function Start(props) {
  const startQuiz = () => props.setHasStarted(true);

  return (
    <div>
      <h1 className="start__title">Quizzical</h1>
      <h5 className="start__sub-title">A Trivia App</h5>
      <button className="btn-large" onClick={startQuiz}>
        Start quiz
      </button>
    </div>
  );
}
