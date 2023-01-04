import './App.css';
import Start from './components/Start';
import Question from './components/Question';
import Footer from './components/Footer';
import React, { useEffect } from 'react';
import Loader from './components/Loader';
import { render } from 'react-dom';

function App() {
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [hasCompleted, setHasCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (hasStarted) {
      function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));

          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }

        return array;
      }

      function decode(str) {
        let txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
      }

      async function fetchDataFromApi() {
        setIsLoading(true);
        const response = await fetch(
          'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple'
        );
        const data = await response.json();
        const questions = [];
        data.results.map((questionObject, it) => {
          const options = [
            ...questionObject.incorrect_answers.map((incorrect_answer) =>
              decode(incorrect_answer)
            ),
            decode(questionObject.correct_answer),
          ];
          questions.push({
            id: it + 1,
            question: decode(questionObject.question),
            correctAnswer: questionObject.correct_answer,
            selectedAnswer: '',
            options: shuffleArray(options),
            isCorrect: false,
          });
        });
        setAllQuestions(questions);
        setIsLoading(false);
      }

      fetchDataFromApi();
    }
  }, [hasStarted]);

  const questions = allQuestions.map((questionDetails) => (
    <Question
      questionDetails={questionDetails}
      key={questionDetails.id}
      setAllQuestions={setAllQuestions}
      hasCompleted={hasCompleted}
    />
  ));

  const renderedElements = (
    <>
      {!hasStarted && !hasCompleted && <Start setHasStarted={setHasStarted} />}
      {(hasStarted || hasCompleted) && !!questions.length && questions}
      {(hasStarted || hasCompleted) && !isLoading && (
        <Footer
          hasStarted={hasStarted}
          hasCompleted={hasCompleted}
          setHasCompleted={setHasCompleted}
          setHasStarted={setHasStarted}
          allQuestions={allQuestions}
        />
      )}
    </>
  );

  React.useEffect(() => {
    console.log(renderedElements);
  }, [isLoading]);

  return (
    <div
      className={`container ${
        (hasStarted || hasCompleted) && !isLoading ? ' gap-1 flex-start' : ''
      }`}
    >
      {isLoading ? <Loader /> : renderedElements}
    </div>
  );
}

export default App;
