import React from 'react';
import { getScore, checkIfAllAnswered } from '../util';

export default function Footer(props) {
  let elements = <div></div>;

  function checkAnswer() {
    if (checkIfAllAnswered(props.allQuestions)) {
      props.setHasStarted(false);
      props.setHasCompleted(true);
    } else {
      alert('Please answer all questions first.');
    }
  }

  function playAgain() {
    props.setHasStarted(true);
    props.setHasCompleted(false);
  }

  if (props.hasStarted && props.allQuestions.length) {
    elements = (
      <button className="btn-regular" onClick={checkAnswer}>
        Check Answers
      </button>
    );
  } else if (props.hasCompleted) {
    elements = (
      <>
        <p className="score">
          You scored {getScore(props.allQuestions)}/5 correct answers
        </p>
        <button className="btn-regular" onClick={playAgain}>
          Play again
        </button>
      </>
    );
  }

  return <div className="display-flex gap-1 align-center">{elements}</div>;
}
