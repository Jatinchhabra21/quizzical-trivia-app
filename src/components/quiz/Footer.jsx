import React from 'react';
import { getScore, checkIfAllAnswered } from '../../util';

export default function Footer(props) {
  let elements = <div></div>;

  function checkAnswer() {
    if (checkIfAllAnswered(props.allQuestions)) {
      props.setHasCompleted(true);
    } else {
      alert('Please answer all questions first.');
    }
  }

  function playAgain() {
    props.setPlayAgainCount((prevCount) => prevCount + 1);
    props.setHasCompleted(false);
  }

  if (props.allQuestions.length && !props.hasCompleted) {
    elements = (
      <button className="btn-regular" onClick={checkAnswer}>
        Check Answers
      </button>
    );
  } else if (props.hasCompleted) {
    elements = (
      <>
        <p className="score">Your score: {getScore(props.allQuestions)}/5</p>
        <button className="btn-regular" onClick={playAgain}>
          Play again
        </button>
      </>
    );
  }

  return <div className="display-flex gap-1 align-center">{elements}</div>;
}
