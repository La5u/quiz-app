import React, { useState } from "react";

const App = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correct: "Paris",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: "4",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: "Mars",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "Jane Austen", "J.K. Rowling"],
      correct: "Harper Lee",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correct: "Pacific",
    },
    {
      question: "Which element has the symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Iron"],
      correct: "Oxygen",
    },
    {
      question: "What is the square root of 16?",
      options: ["2", "3", "4", "5"],
      correct: "4",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
      correct: "Da Vinci",
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      correct: "2",
    },
    {
      question: "Which gas do plants use for photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: "Carbon Dioxide",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold mb-4">Simple Quiz</h1>
        {questions.map((q, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium mb-2">
              {index + 1}. {q.question}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleChange(index, option)}
                    className="form-radio"
                    disabled={submitted}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {submitted && (
              <p
                className={`mt-2 ${
                  answers[index] === q.correct ? "text-green-600" : "text-red-600"
                }`}
              >
                {answers[index] === q.correct
                  ? "Correct!"
                  : `Wrong! The correct answer is "${q.correct}".`}
              </p>
            )}
          </div>
        ))}
        {!submitted && (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default App;

