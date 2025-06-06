import React, { useState, useEffect } from 'react';

const wordBank = [
  { question: "חתול באנגלית", answer: "cat" },
  { question: "A vehicle with two wheels", answer: "bike" },
  { question: "I drink a cup of _____ every morning", answer: "coffee" },
  { question: "מלך החיות באנגלית", answer: "lion" },
  { question: "Opposite of 'cold'", answer: "hot" },
  // המשך הרשימה...
];

export default function WordGuessGame() {
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    if (usedIndexes.length >= wordBank.length) {
      setFeedback(`🎉 No more questions! final score:${score}`);
      return;
    }

    let index;
    do {
      index = Math.floor(Math.random() * wordBank.length);
    } while (usedIndexes.includes(index));

    setUsedIndexes([...usedIndexes, index]);
    setCurrentWord(wordBank[index]);
    setGuess("");
    setFeedback("");
    setAttemptsLeft(3);
    setIsAnswered(false);
    setRound(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (isAnswered || attemptsLeft === 0) return;

    const isCorrect = guess.trim().toLowerCase() === currentWord.answer.toLowerCase();
    if (isCorrect) {
      setFeedback("✅ Correct!");
      setScore(prev => prev + 1);
      setIsAnswered(true);
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      if (newAttempts === 0) {
        setFeedback(`❌ Out of attempts! Answer: ${currentWord.answer}`);
        setIsAnswered(true);
      } else {
        setFeedback(`❌ Try again (${newAttempts} left)`);
      }
    }
  };

  const handleGiveUp = () => {
    setFeedback(`😞 The correct answer was: ${currentWord.answer}`);
    setIsAnswered(true);
    setAttemptsLeft(0);
  };

  return (
    <div className="word-guess-game dark">
      <h2>🎯 Word Guess Game</h2>
      <p className="hint"><strong>Question:</strong> {currentWord.question}</p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Type your guess..."
        disabled={isAnswered}
      />
      <div className="buttons">
        <button className="submit" onClick={handleSubmit} disabled={isAnswered || attemptsLeft === 0}>Submit</button>
        <button className="next" onClick={loadNewWord}>Next</button>
        <button className="give-up" onClick={handleGiveUp} disabled={isAnswered}>I Give Up</button>
      </div>
      <p className="feedback">{feedback}</p>
      <p className="score-round">Score: {score} | Round: {round}</p>
    </div>
  );
}
