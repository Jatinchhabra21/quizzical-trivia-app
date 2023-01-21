import React, { memo } from 'react';
import './question.css';
import Option from './Option';

function Question(props) {
  function selectOption(event, option) {
    props.setAllQuestions((prevAllQuestions) => {
      let newAllQuestion = prevAllQuestions.filter(
        (questionDetails) => questionDetails !== props.questionDetails
      );
      newAllQuestion.splice(props.questionDetails.id - 1, 0, {
        ...props.questionDetails,
        selectedAnswer: option,
      });
      return newAllQuestion;
    });
  }

  const optionElements = props.questionDetails.options.map((option, it) => (
    <Option
      option={option}
      id={props.questionDetails.id}
      selectOption={selectOption}
      key={it}
      hasCompleted={props.hasCompleted}
      correctAnswer={props.questionDetails.correctAnswer}
      selectedAnswer={props.questionDetails.selectedAnswer}
    />
  ));

  return (
    <div className="question__container">
      <h2 className="question">{props.questionDetails.question}</h2>
      <div className="option__container">{optionElements}</div>
    </div>
  );
}

export default memo(Question);
