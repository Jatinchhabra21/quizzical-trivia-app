import React from 'react';

export default function Footer(props) {
  let elements = <div></div>;

  function getScore() {
    let score = 0;
    props.allQuestions.map((questionDetails) => {
      if (questionDetails.selectedAnswer === questionDetails.correctAnswer) {
        score += 1;
      }
    });
    return score;
  }

  function checkIfAllAnswered() {
    let allAnswered = true;
    props.allQuestions.map((questionDetails) => {
      allAnswered = allAnswered && !!questionDetails.selectedAnswer;
    });
    return allAnswered;
  }

  function checkAnswer() {
    if (checkIfAllAnswered()) {
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

  if (props.hasStarted) {
    elements = (
      <button className="btn-regular" onClick={checkAnswer}>
        Check Answers
      </button>
    );
  } else if (props.hasCompleted) {
    elements = (
      <>
        <p>You scored {getScore()}/5 correct answers</p>
        <button className="btn-regular" onClick={playAgain}>
          Play again
        </button>
      </>
    );
  }

  return <div className="display-flex gap-1 align-center">{elements}</div>;
}
