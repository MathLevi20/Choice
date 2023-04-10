import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Question = {
  id: string;
  option1: string;
  option2: string;
  vote1: number;
  vote2: number;
};

function Choice() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cronos-api.onrender.com/question');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleVote = async (id: string, option: number) => {
    try {
      await axios.post('https://cronos-api.onrender.com/vote', { id, option });
      // Atualiza o estado das questões após o voto ser registrado com sucesso
      const updatedQuestions = questions.map(question => {
        if (question.id === id) {
          if (option === 1) {
            return { ...question, vote1: question.vote1 + 1 };
          } else if (option === 2) {
            return { ...question, vote2: question.vote2 + 1 };
          }
        }
        return question;
      });
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-center text-2xl font-bold mb-5">Choice </h1>
      {questions.map(question => (
        <div key={question.id} className="bg-gray-100 p-5 mb-5">
          <div className="grid grid-cols-2 text-center gap-3">
            <div>
              <span className="text-gray-700 font-semibold">Option 1:</span>
              <span className="text-gray-700 ml-1">{question.option1}</span>
            </div>
            <div>
              <span className="text-gray-700 font-semibold">Option 2:</span>
              <span className="text-gray-700 ml-1">{question.option2}</span>
            </div>
            <div>
              <span className="text-gray-700 font-semibold">Vote 1:</span>
              <span className="text-gray-700 ml-1">{question.vote1}</span>
            </div>

            <div>
              <span className="text-gray-700 font-semibold">Vote 2:</span>
              <span className="text-gray-700 ml-1">{question.vote2}</span>
            </div>
            <div className="">
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                onClick={() => handleVote(question.id, 1)}
              >
                Vote 1
              </button>
              </div>
              <div>
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded ml-3"
                onClick={() => handleVote(question.id, 2)}
              >
                Vote 2
              </button>
              </div>
            </div>
          </div>
      
      ))}
    </div>
  );
}

export default Choice;
