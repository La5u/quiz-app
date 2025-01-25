import React from 'react';

const Results = ({ answers, questions, onRetry }) => {
  const incorrectAnswers = questions.filter((q, index) => answers[index] !== q.correct);
  const correctAnswers = questions.filter((q, index) => answers[index] === q.correct);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <div className="questions-container max-h-[60vh] overflow-y-auto pr-4">
        {/* Incorrect Answers Section */}
        {incorrectAnswers.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-red-600">Incorrect Answers</h2>
            {incorrectAnswers.map((q, i) => {
              const originalIndex = questions.findIndex(question => question === q);
              return (
                <div key={originalIndex} className="mb-8 p-6 rounded-lg border border-red-200 bg-red-50">
                  <p className="text-lg font-medium mb-4">
                    {originalIndex + 1}. {q.question}
                  </p>
                  <p className="text-base mb-2">Your answer: 
                    <span className="text-red-600 ml-2 font-medium">
                      {answers[originalIndex]}
                    </span>
                  </p>
                  <p className="text-green-600 text-base font-medium">
                    Correct answer: {q.correct}
                  </p>
                </div>
              );
            })}
          </>
        )}

        {/* Correct Answers Section */}
        {correctAnswers.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 mt-8 text-green-600">Correct Answers</h2>
            {correctAnswers.map((q, i) => {
              const originalIndex = questions.findIndex(question => question === q);
              return (
                <div key={originalIndex} className="mb-8 p-6 rounded-lg border border-green-200 bg-green-50">
                  <p className="text-lg font-medium mb-4">
                    {originalIndex + 1}. {q.question}
                  </p>
                  <p className="text-base mb-2">Your answer: 
                    <span className="text-green-600 ml-2 font-medium">
                      {answers[originalIndex]}
                    </span>
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
      <button
        onClick={onRetry}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mt-4 text-base font-medium"
      >
        Try Again
      </button>
    </>
  );
};

export default Results; 