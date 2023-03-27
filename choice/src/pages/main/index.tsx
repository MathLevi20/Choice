import React, { useState, useEffect } from 'react';

type QuestionProps = {
  question: string;
  optionA: string;
  optionB: string;
  key:number;


};

type ResultsProps = {
  key:string,

  optionA: string;
  optionB: string;
  votesA: number;
  votesB: number;
};

function Question({ question, optionA: OptionA, optionB: OptionB,   }: QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h2 className='px-5 bg-slate-300   grid grid-col-2 w-auto'>{question}</h2>
      <div className='grid grid-cols-2 text-white '>
        <div className=' bg-blue-600 cursor-pointer' onClick={() => handleOptionClick('A')}>

        <button className='p-10  w-auto bg-blue-600  text-center mx-auto' onClick={() => handleOptionClick('A')}>{OptionA}</button>

        </div>
        <div className='bg-red-600  cursor-pointer' onClick={() => handleOptionClick('B ')}>
        <button  className='  bg-red-600 p-10 w-100 text-center mx-auto' onClick={() => handleOptionClick('B')}>{OptionB}</button>
          
</div>
         </div>

      {selectedOption && <p>You selected {selectedOption}</p>}
    </div>
  );
}

function Results({ optionA, optionB, votesA, votesB }: ResultsProps) {
  const totalVotes = votesA + votesB;
  const percentageA = ((votesA / totalVotes) * 100).toFixed(2);
  const percentageB = ((votesB / totalVotes) * 100).toFixed(2);

  return (
    <div>
      <p className='text-white '> {optionA}: {votesA} votes ({percentageA}%)</p>
      <p className='text-white '>{optionB}: {votesB} votes ({percentageB}%)</p>
    </div>
  );
}

export function Choice() {
  const [questions, setQuestions] = useState<QuestionProps[]>([]);

  useEffect(() => {
    fetch('https://cronos-api.onrender.com/question')
      .then(response => response.json())
      .then((data: QuestionProps[]) => setQuestions(data));
  }, []);

  return (
    <div className='p-10'>
        <Question
          key={10}
          question={"Escolha a questão"}
          optionA={"Ola mundo"}
          optionB={"Word "}      />

    </div>
  );
}
