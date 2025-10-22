// Game page component - the main memory card game
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import './Game.css';

function Game() {
  // Get difficulty from navigation state
  const location = useLocation();
  const navigate = useNavigate();
  const difficulty = location.state?.difficulty || 'easy';

  // Game state variables
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set up game based on difficulty
  const getGameSettings = () => {
    switch (difficulty) {
      case 'easy':
        return { pairs: 4, pokemonCount: 4 };
      case 'medium':
        return { pairs: 6, pokemonCount: 6 };
      case 'hard':
        return { pairs: 8, pokemonCount: 8 };
      default:
        return { pairs: 4, pokemonCount: 4 };
    }
  };

  // Fetch Pokemon data from API
  const fetchPokemonData = async () => {
    try {
      setIsLoading(true);
      const settings = getGameSettings();
      const pokemonData = [];

      // Fetch random Pokemon from the API
      for (let i = 0; i < settings.pokemonCount; i++) {
        const randomId = Math.floor(Math.random() * 151) + 1; // First 151 Pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        
        pokemonData.push({
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          matched: false
        });
      }

      // Create pairs of cards
      const gameCards = [];
      pokemonData.forEach((pokemon, index) => {
        // Add two cards for each Pokemon (to make pairs)
        gameCards.push(
          { ...pokemon, uniqueId: `${pokemon.id}-1`, pairId: pokemon.id },
          { ...pokemon, uniqueId: `${pokemon.id}-2`, pairId: pokemon.id }
        );
      });

      // Shuffle the cards randomly
      const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      // If API fails, use fallback data
      createFallbackCards();
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback Pokemon data in case API fails
  const createFallbackCards = () => {
    const settings = getGameSettings();
    const fallbackPokemon = [
      { id: 1, name: 'bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
      { id: 4, name: 'charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
      { id: 7, name: 'squirtle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
      { id: 25, name: 'pikachu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
      { id: 39, name: 'jigglypuff', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png' },
      { id: 143, name: 'snorlax', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png' },
      { id: 150, name: 'mewtwo', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png' },
      { id: 151, name: 'mew', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png' }
    ];

    const gameCards = [];
    for (let i = 0; i < settings.pokemonCount; i++) {
      const pokemon = fallbackPokemon[i];
      gameCards.push(
        { ...pokemon, uniqueId: `${pokemon.id}-1`, pairId: pokemon.id, matched: false },
        { ...pokemon, uniqueId: `${pokemon.id}-2`, pairId: pokemon.id, matched: false }
      );
    }

    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  // Start the game when component loads
  useEffect(() => {
    fetchPokemonData();
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (!gameWon && !isLoading) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameWon, isLoading]);

  // Check for win condition
  useEffect(() => {
    const settings = getGameSettings();
    if (matchedCards.length === settings.pairs * 2) {
      setGameWon(true);
    }
  }, [matchedCards, difficulty]);

  // Handle card click
  const handleCardClick = (cardId) => {
    // Don't allow clicking if game is won or loading
    if (gameWon || isLoading) return;

    // Don't allow clicking if card is already flipped or matched
    const card = cards.find(c => c.uniqueId === cardId);
    if (flippedCards.includes(cardId) || matchedCards.includes(cardId)) return;

    // Don't allow clicking if 2 cards are already flipped
    if (flippedCards.length >= 2) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // If this is the second card, check for match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.uniqueId === firstId);
      const secondCard = cards.find(c => c.uniqueId === secondId);

      if (firstCard.pairId === secondCard.pairId) {
        // Match found!
        setMatchedCards([...matchedCards, firstId, secondId]);
        setFlippedCards([]);
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Reset the game
  const resetGame = () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setGameWon(false);
    setIsLoading(true);
    fetchPokemonData();
  };

  // Format time as minutes:seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="game-container">
        <div className="loading">
          <h2>Loading Pokemon...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  // Show win screen
  if (gameWon) {
    return (
      <div className="game-container">
        <div className="win-screen">
          <h1>🎉 Congratulations! 🎉</h1>
          <h2>You Won!</h2>
          <div className="win-stats">
            <p>Time: {formatTime(time)}</p>
            <p>Moves: {moves}</p>
            <p>Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
          </div>
          <div className="win-buttons">
            <button className="btn" onClick={resetGame}>
              Play Again
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>PokéMatch Game</h1>
        <div className="game-stats">
          <div className="stat">
            <span className="stat-label">Time:</span>
            <span className="stat-value">{formatTime(time)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Moves:</span>
            <span className="stat-value">{moves}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Difficulty:</span>
            <span className="stat-value">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <div className="game-board">
        {cards.map((card) => (
          <Card
            key={card.uniqueId}
            card={card}
            isFlipped={flippedCards.includes(card.uniqueId)}
            isMatched={matchedCards.includes(card.uniqueId)}
            onClick={() => handleCardClick(card.uniqueId)}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
