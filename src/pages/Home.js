// Home page component - the main landing page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  // State to track the selected difficulty
  const [difficulty, setDifficulty] = useState('easy');
  const navigate = useNavigate();

  // Function to start the game with selected difficulty
  const startGame = () => {
    // Navigate to game page and pass difficulty as state
    navigate('/game', { state: { difficulty } });
  };

  return (
    <div className="home-container">
      <div className="home-content">
        {/* Main title and description */}
        <h1 className="game-title">PokéMatch</h1>
        <p className="game-description">
          Test your memory skills with this fun Pokemon card matching game! 
          Flip cards to find matching pairs and become a Pokemon master!
        </p>

        {/* Difficulty selection */}
        <div className="difficulty-section">
          <h2>Choose Difficulty:</h2>
          <div className="difficulty-options">
            <label className="difficulty-option">
              <input
                type="radio"
                value="easy"
                checked={difficulty === 'easy'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Easy (4 pairs)
            </label>
            <label className="difficulty-option">
              <input
                type="radio"
                value="medium"
                checked={difficulty === 'medium'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Medium (6 pairs)
            </label>
            <label className="difficulty-option">
              <input
                type="radio"
                value="hard"
                checked={difficulty === 'hard'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Hard (8 pairs)
            </label>
          </div>
        </div>

        {/* Start game button */}
        <button className="btn start-btn" onClick={startGame}>
          Start Game!
        </button>

        {/* Game instructions */}
        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Click on cards to flip them over</li>
            <li>Find matching Pokemon pairs</li>
            <li>Complete the game as fast as possible</li>
            <li>Try to beat your best score!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
