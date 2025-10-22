# PokéMatch - Pokemon Memory Card Game

A fun and interactive memory card game where players flip cards to find matching Pokemon pairs. Built with React, this game helps you practice memory skills while enjoying your favorite Pokemon characters!

## 🎮 How to Play

1. **Choose Difficulty**: Select Easy (4 pairs), Medium (6 pairs), or Hard (8 pairs)
2. **Flip Cards**: Click on cards to flip them over and reveal Pokemon
3. **Find Matches**: Match identical Pokemon pairs to score points
4. **Complete Fast**: Try to finish the game in the shortest time with the fewest moves
5. **Track Progress**: View your scores on the leaderboard and profile page

## 🚀 Features

### Game Features
- **Three Difficulty Levels**: Easy, Medium, and Hard modes
- **Real Pokemon Data**: Fetches actual Pokemon from the PokeAPI
- **Timer & Move Counter**: Track your performance
- **Card Flip Animation**: Smooth 3D card flip effects
- **Win Celebration**: Special screen when you complete the game

### App Features
- **4 Main Pages**: Home, Game, Leaderboard, and Profile
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Saves your scores and progress
- **Error Handling**: Graceful fallback if API fails
- **Modern UI**: Beautiful gradient backgrounds and animations

## 🛠️ Technical Details

### Built With
- **React 18**: Modern React with hooks
- **React Router**: Navigation between pages
- **CSS3**: Custom styling with animations
- **PokeAPI**: Real Pokemon data
- **Local Storage**: Data persistence

### Code Structure
```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar
│   ├── Navbar.css
│   ├── Card.js         # Memory game card
│   └── Card.css
├── pages/              # Main app pages
│   ├── Home.js         # Landing page
│   ├── Home.css
│   ├── Game.js         # Memory game
│   ├── Game.css
│   ├── Leaderboard.js  # High scores
│   ├── Leaderboard.css
│   ├── Profile.js      # Player stats
│   └── Profile.css
├── App.js              # Main app component
├── App.css             # Global styles
├── index.js            # App entry point
└── index.css           # Base styles
```

### Key Features Implemented
- **ES6 Syntax**: Modern JavaScript with const, let, arrow functions
- **React Hooks**: useState, useEffect for state management
- **Async/Await**: For API calls and data fetching
- **Error Handling**: Try/catch blocks for robust error handling
- **DRY Principle**: Reusable components and functions
- **Responsive Design**: Mobile-first CSS approach

## 🎯 Game Rules

1. **Objective**: Find all matching Pokemon pairs
2. **Scoring**: Based on time and number of moves
3. **Strategy**: Remember card positions to make matches efficiently
4. **Winning**: Complete all pairs to win the game

## 📱 How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Open Browser**: Navigate to `http://localhost:3000`

4. **Play Game**: Click "Start Game!" and choose your difficulty

## 🏆 Scoring System

- **Time**: Faster completion = better score
- **Moves**: Fewer moves = better score
- **Difficulty**: Harder levels = higher potential scores
- **Leaderboard**: Compete with other players (stored locally)

## 🎨 Design Features

- **Pokemon Theme**: Colorful Pokemon-inspired design
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Card Animations**: Smooth 3D flip effects
- **Responsive Layout**: Works on all screen sizes
- **Loading States**: User-friendly loading indicators
- **Error States**: Clear error messages and fallbacks

## 🔧 Future Improvements

- **Multiplayer Mode**: Play with friends online
- **More Pokemon**: Add more Pokemon generations
- **Sound Effects**: Add game sounds and music
- **Achievements**: Unlock badges and rewards
- **Daily Challenges**: Special daily game modes
- **Social Features**: Share scores on social media

## 🐛 Known Issues

- **API Dependency**: Game requires internet connection for Pokemon data
- **Local Storage Only**: Scores are not synced across devices
- **No Backend**: Currently frontend-only (as requested)

## 📝 Development Notes

This project was built as a frontend-only application focusing on:
- Clean, readable code suitable for 10th grade level
- Modern React patterns and best practices
- Responsive design and user experience
- Error handling and edge cases
- Performance optimization

## 🎓 Learning Outcomes

Through building this project, I learned:
- React component lifecycle and state management
- API integration and error handling
- CSS animations and responsive design
- Local storage and data persistence
- Game logic and user interaction patterns
- Code organization and best practices

## 📄 License

This project is for educational purposes as part of a coding bootcamp capstone project.

---

**Happy Gaming! 🎮✨**
