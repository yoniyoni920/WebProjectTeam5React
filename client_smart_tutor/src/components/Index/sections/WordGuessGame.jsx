import React, { useState, useEffect } from 'react';

// Word list
const wordBankEasy = [
  { question: "חתול באנגלית", answer: "cat" },
  { question: "A vehicle with two wheels not a Motorcycle", answer: "bike" },
  { question: "70% of the world is:", answer: "water" },
  { question: "Opposite of 'cold'", answer: "hot" },
  { question: "A yellow fruit monkeys like", answer: "banana" },
  { question: "The color of the sky", answer: "blue" },
  { question: "I use this to write on paper", answer: "pen" },
  { question: "Opposite of 'up'", answer: "down" },
  { question: "An animal that barks", answer: "dog" },
  { question: "The color of snow", answer: "white" }
];
const wordBankMedium = [
  { question: "The opposite of 'begin'", answer: "end" },
  { question: "Synonym for 'smart'", answer: "clever" },
  { question: "The color of a ripe tomato", answer: "red" },
  { question: "The place where you watch movies", answer: "cinema" },
  { question: "Insects that make honey", answer: "bees" },
  { question: "The gas we breathe", answer: "oxygen" },
  { question: "A musical instrument with keys", answer: "piano" },
  { question: "Frozen water is called", answer: "ice" },
  { question: "The organ that pumps blood", answer: "heart" },
  { question: "The part of the body used for hearing", answer: "ear" }
];
const wordBankHard = [
  { question: "A scientist who studies living organisms", answer: "biologist" },
  { question: "The capital city of Australia", answer: "canberra" },
  { question: "The hardest natural substance", answer: "diamond" },
  { question: "A word meaning 'fear of closed spaces'", answer: "claustrophobia" },
  { question: "The chemical symbol for gold", answer: "au" },
  { question: "A book of synonyms", answer: "thesaurus" },
  { question: "The process of plants making food from sunlight", answer: "photosynthesis" },
  { question: "A triangle with all sides different", answer: "scalene" },
  { question: "The study of the universe", answer: "cosmology" },
  { question: "An animal that hibernates in winter", answer: "bear" }
];

const Easy = "Easy";
const Medium = "Medium";
const Hard = "Hard";


function calculateNextDifficulty(current, score) {
  if (score > 3) {
    if (current === Easy) return Medium;
    if (current === Medium) return Hard;
  } else if (score < 3) {
    if (current === Hard) return Medium;
    if (current === Medium) return Easy;
  }
  return current;
}



const saveScoreToServer = async ({ username, score, correctAnswers, attempts, difficultyLevel }) => {
  try {
    const res = await fetch('/api/save-score', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        score,
        correctAnswers,
        attempts,
        difficultyLevel,
        timestamp: new Date().toISOString()
      })
    });
    const data = await res.json();
    console.log("✅ Score saved:", data);
  } catch (err) {
    console.error("❌ Error saving score:", err);
  }
};
const getDifficultyFromServer = async ({ username }) => {
  try {
  const res = await fetch(`/api/get-user-difficulty?username=${encodeURIComponent(username)}`);
  const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to fetch difficulty');

    return data;
  } catch (err) {
    console.error("Error fetching difficulty:", err);
    return { difficulty: "Easy" }; // fallback only on real error
  }
};



export default function WordGuessGame({ username }) {
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [round, setRound] = useState(1);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isAnswered, setIsAnswered] = useState(false);
  const [difficultyLevel, setDifficulty] = useState(Easy);
  const [loading, setLoading] = useState(true);
  const maxRounds = 5;

  useEffect(() => {
    const init = async () => {
      let difficulty = Easy;
      if (username) {
        const data = await getDifficultyFromServer({ username });
        difficulty = data?.difficulty || Easy;
      }
      setDifficulty(difficulty);
      setLoading(false);
      loadNewWord(false, difficulty); // pass difficulty to use the right word bank
    };

    init();
  }, []);
  useEffect(() => {
  if (round > maxRounds || usedIndexes.length >= getWordBankByDifficulty(difficultyLevel).length) {
    const newLevel = calculateNextDifficulty(difficultyLevel, score);
    

    if (newLevel !== difficultyLevel) {
      setFeedback(`🎉 Game Over! Final score: ${score}\nYour New Difficulty is: ${newLevel}`);
    } else {
      setFeedback(`🎉 Game Over! Final score: ${score}`);
    }
    setDifficulty(newLevel);
    if (username) {
      saveScoreToServer({
        username,
        score,
        correctAnswers,
        attempts: round - 1,
         difficultyLevel: newLevel
      });
    }
  }
}, [round, usedIndexes]); // runs after last round or used up all words
const loadNewWord = (incrementRound = true, overrideDifficulty = difficultyLevel) => {
  const wordBank = getWordBankByDifficulty(overrideDifficulty);

  if (round > maxRounds || usedIndexes.length >= wordBank.length) return;

  let index;
  do {
    index = Math.floor(Math.random() * wordBank.length);
  } while (usedIndexes.includes(index));

  setUsedIndexes(prev => [...prev, index]);
  setCurrentWord(wordBank[index]);
  setGuess("");
  setFeedback("");
  setAttemptsLeft(3);
  setIsAnswered(false);

  if (incrementRound) {
    setRound(prev => prev + 1);
  }
};

  const getWordBankByDifficulty = (level) => {
    switch (level) {
      case Medium: return wordBankMedium;
      case Hard: return wordBankHard;
      case Easy: return wordBankEasy;
      default: return wordBankEasy;
    }
  };
  const handleSubmit = () => {
    if (isAnswered || attemptsLeft === 0 || round > maxRounds) return;

    const isCorrect = guess.trim().toLowerCase() === currentWord.answer.toLowerCase();
    if (isCorrect) {
      setFeedback("✅ Correct!");
      setScore(prev => prev + 1);
      setCorrectAnswers(prev => prev + 1);
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
    if (round > maxRounds) return;

    setFeedback(`😞 The correct answer was: ${currentWord.answer}`);
    setIsAnswered(true);
    setAttemptsLeft(0);
  };

  const canPlayMore = round <= maxRounds;
  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: 40, fontSize: '1.5rem' }}>Loading...</p>;
  }
  return (
    <div className="word-guess-game dark" style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h2>🎯 Word Guess Game</h2>
      {canPlayMore ? (
        <>
        <h4 style={{
          color: 'black',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          marginBottom: '12px',
          

        }}>
           Current Difficulty: <span style={{ color: '#347433' }}>{difficultyLevel}</span>
        </h4>
          <p className="hint" style={{ color: '#333446', background: '#EAEFEF', borderRadius: 12, padding: '16px 32px', display: 'block', fontSize: '1.5rem', fontWeight: 700, marginBottom: 24, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 2px 8px rgba(127,140,170,0.10)' }}>
            <span style={{ color: '#7F8CAA', fontWeight: 800 }}>Question:</span> {currentWord.question}
          </p>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Type your guess..."
            disabled={isAnswered}
            style={{ padding: '16px', width: '100%', marginBottom: '20px', color: '#333446', background: '#fff', border: '2px solid #7F8CAA', borderRadius: 12, fontSize: '1.3rem', fontWeight: 600 }}
          />
          <div className="buttons" style={{ display: 'flex', gap: '18px', justifyContent: 'center', marginBottom: 18 }}>
            <button style={{ color: '#333446', background: '#B8CFCE', border: '2px solid #7F8CAA', borderRadius: 12, padding: '14px 36px', fontWeight: 800, fontSize: '1.3rem', transition: 'all 0.2s' }} onClick={handleSubmit} disabled={isAnswered || attemptsLeft === 0}>Submit</button>
            <button style={{ color: '#333446', background: '#B8CFCE', border: '2px solid #7F8CAA', borderRadius: 12, padding: '14px 36px', fontWeight: 800, fontSize: '1.3rem', transition: 'all 0.2s' }} onClick={() => loadNewWord(true)} disabled={!isAnswered}>Next</button>
            <button style={{ color: '#333446', background: '#B8CFCE', border: '2px solid #7F8CAA', borderRadius: 12, padding: '14px 36px', fontWeight: 800, fontSize: '1.3rem', transition: 'all 0.2s' }} onClick={handleGiveUp} disabled={isAnswered}>I Give Up</button>
          </div>
          {feedback && (
            <p className="feedback" style={{ color: '#333446', background: '#EAEFEF', borderRadius: 12, padding: '16px 32px', display: 'block', marginTop: 18, fontWeight: 700, fontSize: '1.3rem', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 2px 8px rgba(127,140,170,0.10)' }}>{feedback}</p>
          )}
          <p className="score-round" style={{
            color: '#333446',
            background: '#EAEFEF',
            borderRadius: 12,
            padding: '16px 32px',
            fontWeight: 700,
            marginTop: 18,
            marginBottom: 0,
            fontSize: '1.5rem',
            textAlign: 'center',
            width: 'fit-content',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: '0 2px 8px rgba(127,140,170,0.10)'
          }}>
            Score: {score} | Round: {round} / {maxRounds}
          </p>
        </>
      ) : (



        
        <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '32px', color: '#333446', background: '#EAEFEF', borderRadius: 12, padding: '18px 36px', display: 'block', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 2px 8px rgba(127,140,170,0.10)' }}>
         {feedback }
        </p>
      )}
    </div>
  );
}
