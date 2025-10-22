// Leaderboard page component - shows high scores and rankings
import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

function Leaderboard() {
  // State to store leaderboard data
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load leaderboard data when component mounts
  useEffect(() => {
    loadLeaderboardData();
  }, []);

  // Function to load leaderboard data from localStorage
  const loadLeaderboardData = () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get scores from localStorage (in a real app, this would come from an API)
      const savedScores = localStorage.getItem('pokematch-scores');
      
      if (savedScores) {
        const parsedScores = JSON.parse(savedScores);
        // Sort scores by time (fastest first), then by moves
        const sortedScores = parsedScores.sort((a, b) => {
          if (a.time !== b.time) {
            return a.time - b.time;
          }
          return a.moves - b.moves;
        });
        setScores(sortedScores);
      } else {
        // If no scores exist, create some sample data
        createSampleData();
      }
    } catch (err) {
      console.error('Error loading leaderboard:', err);
      setError('Failed to load leaderboard data');
      createSampleData();
    } finally {
      setIsLoading(false);
    }
  };

  // Create sample leaderboard data for demonstration
  const createSampleData = () => {
    const sampleScores = [
      { id: 1, playerName: 'Ash Ketchum', time: 45, moves: 12, difficulty: 'easy', date: '2024-01-15' },
      { id: 2, playerName: 'Misty', time: 52, moves: 14, difficulty: 'easy', date: '2024-01-14' },
      { id: 3, playerName: 'Brock', time: 38, moves: 10, difficulty: 'medium', date: '2024-01-13' },
      { id: 4, playerName: 'Gary Oak', time: 67, moves: 18, difficulty: 'medium', date: '2024-01-12' },
      { id: 5, playerName: 'Professor Oak', time: 29, moves: 8, difficulty: 'hard', date: '2024-01-11' },
      { id: 6, playerName: 'Team Rocket', time: 89, moves: 22, difficulty: 'hard', date: '2024-01-10' },
      { id: 7, playerName: 'Pikachu', time: 41, moves: 11, difficulty: 'easy', date: '2024-01-09' },
      { id: 8, playerName: 'Charizard', time: 55, moves: 15, difficulty: 'medium', date: '2024-01-08' }
    ];
    
    setScores(sampleScores);
    // Save sample data to localStorage
    localStorage.setItem('pokematch-scores', JSON.stringify(sampleScores));
  };

  // Function to clear all scores (for testing)
  const clearScores = () => {
    if (window.confirm('Are you sure you want to clear all scores?')) {
      localStorage.removeItem('pokematch-scores');
      setScores([]);
    }
  };

  // Function to add a new score (this would be called from the game when it ends)
  const addScore = (playerName, time, moves, difficulty) => {
    const newScore = {
      id: Date.now(),
      playerName,
      time,
      moves,
      difficulty,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedScores = [...scores, newScore]
      .sort((a, b) => {
        if (a.time !== b.time) {
          return a.time - b.time;
        }
        return a.moves - b.moves;
      });
    
    setScores(updatedScores);
    localStorage.setItem('pokematch-scores', JSON.stringify(updatedScores));
  };

  // Format time as minutes:seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get difficulty display name
  const getDifficultyName = (difficulty) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  // Get medal emoji based on rank
  const getMedal = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">
          <h2>Loading Leaderboard...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // Show error screen
  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="error">
          <h2>Error Loading Leaderboard</h2>
          <p>{error}</p>
          <button className="btn" onClick={loadLeaderboardData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>🏆 Leaderboard 🏆</h1>
        <p>Top Pokemon Memory Game Scores</p>
        <button className="btn btn-secondary" onClick={clearScores}>
          Clear Scores
        </button>
      </div>

      {scores.length === 0 ? (
        <div className="no-scores">
          <h2>No Scores Yet!</h2>
          <p>Play the game to see your scores here.</p>
        </div>
      ) : (
        <div className="scores-table-container">
          <table className="scores-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Time</th>
                <th>Moves</th>
                <th>Difficulty</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={score.id} className={index < 3 ? 'top-three' : ''}>
                  <td className="rank-cell">
                    <span className="medal">{getMedal(index)}</span>
                  </td>
                  <td className="player-cell">{score.playerName}</td>
                  <td className="time-cell">{formatTime(score.time)}</td>
                  <td className="moves-cell">{score.moves}</td>
                  <td className="difficulty-cell">
                    <span className={`difficulty-badge ${score.difficulty}`}>
                      {getDifficultyName(score.difficulty)}
                    </span>
                  </td>
                  <td className="date-cell">{score.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="leaderboard-footer">
        <p>Play more games to improve your ranking!</p>
      </div>
    </div>
  );
}

export default Leaderboard;
