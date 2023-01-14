import './App.css';
import Start from './components/Start';
import Question from './components/Question';
import Footer from './components/Footer';
import React, { useEffect } from 'react';
import Loader from './components/Loader';
import { fetchQuestions } from './util';

function App() {
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [hasCompleted, setHasCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (hasStarted) {
      setIsLoading(true);
      async function fetchDataFromApi() {
        let questions = await fetchQuestions();
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
