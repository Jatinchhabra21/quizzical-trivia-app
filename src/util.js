export function getScore(allQuestions) {
  let score = 0;
  allQuestions.map((questionDetails) => {
    if (questionDetails.selectedAnswer === questionDetails.correctAnswer) {
      score += 1;
    }
  });
  return score;
}

export function checkIfAllAnswered(allQuestions) {
  let allAnswered = true;
  allQuestions.map((questionDetails) => {
    allAnswered = allAnswered && !!questionDetails.selectedAnswer;
  });
  return allAnswered;
}

export function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export function decode(str) {
  let txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

export async function fetchQuestions() {
  const data = await fetch(
    'https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple'
  ).then((res) => res.json());
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
      correctAnswer: decode(questionObject.correct_answer),
      selectedAnswer: '',
      options: shuffleArray(options),
      isCorrect: false,
    });
  });
  return questions;
}
