import React, { useState } from "react";
import CircularProgress from './components/CircularProgress';
import Results from './components/Results';
import { questions } from './data/questions';

const App = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const correctAnswers = questions.filter((q, index) => answers[index] === q.correct).length;
  const score = (correctAnswers / questions.length) * 100;

  const handleChange = (index, option) => {
    const newAnswers = { ...answers, [index]: option };
    setAnswers(newAnswers);
    setProgress((Object.keys(newAnswers).length / questions.length) * 100);
    
    const questionsContainer = document.querySelector('.questions-container');
    const nextQuestion = document.querySelector(
      `[name="question-${questions.findIndex((_, i) => !newAnswers[i])}"]`
    );
    if (nextQuestion && questionsContainer) {
      const containerRect = questionsContainer.getBoundingClientRect();
      const questionRect = nextQuestion.getBoundingClientRect();
      questionsContainer.scrollTop += questionRect.top - containerRect.top - 100;
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <div className="flex gap-6">
          {/* Questions section */}
          <div className="flex-1">
            {!submitted ? (
              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (Object.keys(answers).length === questions.length) {
                    setSubmitted(true);
                  }
                }}
              >
                <h1 className="text-2xl font-bold mb-4">Impossible Quiz</h1>
                <div className="questions-container max-h-[60vh] overflow-y-auto pr-4">
                  {questions.map((q, index) => (
                    <div key={index} className="mb-8">
                      <p className="text-lg font-medium mb-4">{index + 1}. {q.question}</p>
                      <div className="grid grid-cols-1 gap-3">
                        {q.options.map(option => (
                          <label key={option} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <input 
                              type="radio" 
                              name={`question-${index}`} 
                              value={option}
                              onChange={() => handleChange(index, option)}
                              className="form-radio w-5 h-5 text-blue-500 mr-3" 
                            />
                            <span className="text-base">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                  disabled={Object.keys(answers).length !== questions.length}
                >
                  Submit
                </button>
              </form>
            ) : (
              <Results 
                answers={answers} 
                questions={questions} 
                onRetry={handleRetry}
              />
            )}
          </div>

          {/* Progress section - fixed on the right */}
          <div className="sticky top-6 self-start">
            <div className="flex flex-col items-center">
              <CircularProgress 
                progress={submitted ? score : progress} 
                color={submitted ? "green" : "blue"} 
              />
              <p className={`text-sm mt-2 ${submitted && score > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                {submitted ? `Score: ${Math.round(score)}%` : `${Math.round(progress)}% Complete`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
