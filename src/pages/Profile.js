// Profile page component - shows player info and personal stats
import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  // State for player profile data
  const [playerName, setPlayerName] = useState('');
  const [playerStats, setPlayerStats] = useState({
    totalGames: 0,
    bestTime: null,
    bestMoves: null,
    averageTime: 0,
    averageMoves: 0,
    gamesWon: 0,
    winRate: 0
  });
  const [recentGames, setRecentGames] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load player data when component mounts
  useEffect(() => {
    loadPlayerData();
  }, []);

  // Function to load player data from localStorage
  const loadPlayerData = () => {
    try {
      setIsLoading(true);
      
      // Get player name from localStorage
      const savedName = localStorage.getItem('pokematch-player-name');
      if (savedName) {
        setPlayerName(savedName);
      } else {
        setPlayerName('Pokemon Trainer');
      }

      // Get all scores from localStorage
      const savedScores = localStorage.getItem('pokematch-scores');
      if (savedScores) {
        const allScores = JSON.parse(savedScores);
        calculatePlayerStats(allScores);
        setRecentGames(allScores.slice(0, 5)); // Show last 5 games
      } else {
        // If no scores, show default stats
        setPlayerStats({
          totalGames: 0,
          bestTime: null,
          bestMoves: null,
          averageTime: 0,
          averageMoves: 0,
          gamesWon: 0,
          winRate: 0
        });
        setRecentGames([]);
      }
    } catch (error) {
      console.error('Error loading player data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate player statistics from scores
  const calculatePlayerStats = (scores) => {
    if (scores.length === 0) {
      setPlayerStats({
        totalGames: 0,
        bestTime: null,
        bestMoves: null,
        averageTime: 0,
        averageMoves: 0,
        gamesWon: 0,
        winRate: 0
      });
      return;
    }

    const totalGames = scores.length;
    const times = scores.map(score => score.time);
    const moves = scores.map(score => score.moves);
    
    const bestTime = Math.min(...times);
    const bestMoves = Math.min(...moves);
    const averageTime = Math.round(times.reduce((sum, time) => sum + time, 0) / totalGames);
    const averageMoves = Math.round(moves.reduce((sum, move) => sum + move, 0) / totalGames);
    
    // Assume all completed games are wins (since we only save completed games)
    const gamesWon = totalGames;
    const winRate = 100; // 100% since we only save completed games

    setPlayerStats({
      totalGames,
      bestTime,
      bestMoves,
      averageTime,
      averageMoves,
      gamesWon,
      winRate
    });
  };

  // Function to save player name
  const savePlayerName = () => {
    if (playerName.trim()) {
      localStorage.setItem('pokematch-player-name', playerName.trim());
      setIsEditing(false);
    }
  };

  // Function to cancel editing
  const cancelEditing = () => {
    const savedName = localStorage.getItem('pokematch-player-name') || 'Pokemon Trainer';
    setPlayerName(savedName);
    setIsEditing(false);
  };

  // Function to clear all player data
  const clearPlayerData = () => {
    if (window.confirm('Are you sure you want to clear all your game data? This cannot be undone!')) {
      localStorage.removeItem('pokematch-scores');
      localStorage.removeItem('pokematch-player-name');
      setPlayerName('Pokemon Trainer');
      setPlayerStats({
        totalGames: 0,
        bestTime: null,
        bestMoves: null,
        averageTime: 0,
        averageMoves: 0,
        gamesWon: 0,
        winRate: 0
      });
      setRecentGames([]);
    }
  };

  // Format time as minutes:seconds
  const formatTime = (seconds) => {
    if (seconds === null) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get difficulty display name
  const getDifficultyName = (difficulty) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading">
          <h2>Loading Profile...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>👤 Player Profile</h1>
        
        {/* Player name section */}
        <div className="player-name-section">
          {isEditing ? (
            <div className="name-edit">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="name-input"
                placeholder="Enter your name"
                maxLength={20}
              />
              <div className="name-buttons">
                <button className="btn" onClick={savePlayerName}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="name-display">
              <h2>{playerName}</h2>
              <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
                Edit Name
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Player statistics */}
      <div className="stats-section">
        <h3>📊 Your Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-info">
              <div className="stat-value">{playerStats.totalGames}</div>
              <div className="stat-label">Total Games</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <div className="stat-value">{formatTime(playerStats.bestTime)}</div>
              <div className="stat-label">Best Time</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <div className="stat-value">{playerStats.bestMoves || 'N/A'}</div>
              <div className="stat-label">Best Moves</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <div className="stat-value">{formatTime(playerStats.averageTime)}</div>
              <div className="stat-label">Average Time</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <div className="stat-value">{playerStats.averageMoves}</div>
              <div className="stat-label">Average Moves</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💯</div>
            <div className="stat-info">
              <div className="stat-value">{playerStats.winRate}%</div>
              <div className="stat-label">Win Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent games */}
      <div className="recent-games-section">
        <h3>🕒 Recent Games</h3>
        {recentGames.length === 0 ? (
          <div className="no-games">
            <p>No games played yet. Start playing to see your recent games here!</p>
          </div>
        ) : (
          <div className="games-list">
            {recentGames.map((game, index) => (
              <div key={game.id} className="game-item">
                <div className="game-rank">#{index + 1}</div>
                <div className="game-details">
                  <div className="game-time">Time: {formatTime(game.time)}</div>
                  <div className="game-moves">Moves: {game.moves}</div>
                  <div className="game-difficulty">
                    <span className={`difficulty-badge ${game.difficulty}`}>
                      {getDifficultyName(game.difficulty)}
                    </span>
                  </div>
                </div>
                <div className="game-date">{game.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="profile-actions">
        <button className="btn btn-secondary" onClick={loadPlayerData}>
          Refresh Data
        </button>
        <button className="btn danger" onClick={clearPlayerData}>
          Clear All Data
        </button>
      </div>
    </div>
  );
}

export default Profile;
