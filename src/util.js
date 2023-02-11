import { CATEGORIES } from './constants';

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

function getCategoryId(category) {
  const categoryObj = Object.values(CATEGORIES).filter(
    (item) => item.value === category
  );
  return categoryObj[0]?.id;
}

async function setToken() {
  const token = await fetch(
    'https://opentdb.com/api_token.php?command=request'
  ).then((res) => res.json());
  sessionStorage.setItem('token', token.token);
}

export async function fetchQuestions() {
  const preference = {
    number: JSON.parse(sessionStorage.getItem('number')),
    category: JSON.parse(sessionStorage.getItem('category')),
    difficulty: JSON.parse(sessionStorage.getItem('difficulty')),
  };

  await setToken();

  const url = `https://opentdb.com/api.php?amount=${
    preference.number
  }&difficulty=${
    preference.difficulty !== 'difficulty' ? preference.difficulty : 'easy'
  }${
    preference.category !== 'category'
      ? `&category=${getCategoryId(preference.category)}`
      : ''
  }&type=multiple&token=${sessionStorage.getItem('token')}`;

  const data = await fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
      return { response_code: 3 };
    });
  const questions = [];
  // create allQuestions object
  data?.results?.map((questionObject, it) => {
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
  return { responseCode: data.response_code, questions };
}
