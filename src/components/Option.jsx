import React from 'react';

export default function Option(props) {
  let isIncorrect = false;
  let isSelected = false;

  if (
    props.hasCompleted &&
    props.selectedAnswer === props.option &&
    props.option !== props.correctAnswer
  ) {
    isIncorrect = true;
  } else if (props.selectedAnswer && props.selectedAnswer === props.option) {
    isSelected = true;
  }

  return (
    <>
      <input
        type="radio"
        value={props.option}
        id={props.option}
        name={props.id}
        className="appearance-none"
      />
      <label
        htmlFor={props.option}
        className={`option 
        ${
          props.hasCompleted && props.option === props.correctAnswer
            ? ' correct'
            : ''
        }
        ${!props.hasCompleted && isSelected ? ' selected' : ''} ${
          isIncorrect ? ' incorrect' : ''
        }
        ${
          props.hasCompleted && isIncorrect && !isSelected
            ? ' not-selected'
            : ''
        }
        ${props.hasCompleted ? 'pointer-not-allowed' : ''}`}
        onClick={
          !props.hasCompleted
            ? (event) => props.selectOption(event, props.option)
            : () => {}
        }
      >
        {props.option}
      </label>
    </>
  );
}
