// Card component for individual memory game cards
import React from 'react';
import './Card.css';

function Card({ card, isFlipped, isMatched, onClick }) {
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        {/* Card back (question mark) */}
        <div className="card-back">
          <div className="card-back-content">
            <span className="question-mark">?</span>
          </div>
        </div>
        
        {/* Card front (Pokemon image and name) */}
        <div className="card-front">
          <div className="card-front-content">
            <img 
              src={card.image} 
              alt={card.name}
              className="pokemon-image"
              onError={(e) => {
                // If image fails to load, show a placeholder
                e.target.src = 'https://via.placeholder.com/100x100/4CAF50/white?text=Pokemon';
              }}
            />
            <p className="pokemon-name">{card.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
