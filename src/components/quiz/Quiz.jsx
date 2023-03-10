import React, { useState, useEffect } from 'react';
import Question from './Question';
import Footer from './Footer';
import Loader from './Loader';
import { fetchQuestions } from '../../util';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [playAgainCount, setPlayAgainCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    async function fetchDataFromApi() {
      let { responseCode, questions } = await fetchQuestions();
      setAllQuestions(questions);
      setIsLoading(false);
      console.log(responseCode);
      if (responseCode !== 0) {
        navigate('/error');
      }
    }
    fetchDataFromApi();
  }, [playAgainCount]);

  const questions = allQuestions.map((questionDetails) => (
    <Question
      questionDetails={questionDetails}
      key={questionDetails.id}
      setAllQuestions={setAllQuestions}
      hasCompleted={hasCompleted}
    />
  ));

  const renderQuestions = questions;
  const renderFooter = (
    <Footer
      hasCompleted={hasCompleted}
      setHasCompleted={setHasCompleted}
      allQuestions={allQuestions}
      playAgainCount={playAgainCount}
      setPlayAgainCount={setPlayAgainCount}
    />
  );

  return (
    <div className={`container ${!isLoading ? 'flex-start gap-1' : ''}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {renderQuestions}
          {renderFooter}
        </>
      )}
    </div>
  );
}
