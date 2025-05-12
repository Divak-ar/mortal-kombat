# Mortal Kombat Style Fighting Game

![](img/game/start.png)

A 2D fighting game inspired by classic fighting games, built using HTML5 Canvas and JavaScript.

## 🎮 Game Features

- Two playable characters with unique animations and attack styles
- Health bars and timer system
- Fluid movement and fighting mechanics
- Sprite-based animations for running, jumping, attacking, and special moves
- Win/lose conditions based on health or time

## 🕹️ How to Play

### Controls

![](img/game/move.png)

#### Player 1 (Samurai Mack):
- **A** - Move left
- **D** - Move right
- **W** - Jump
- **Space** - Attack

#### Player 2 (Kenji):
- **←** - Move left
- **→** - Move right
- **↑** - Jump
- **↓** - Attack

### Game Rules
- Each player starts with 100% health
- 60-second time limit per round
- Reduce your opponent's health to zero before time runs out
- If time runs out, the player with more health wins
- If both players have equal health when time runs out, the match is a tie

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- HTML5 Canvas for rendering
- GSAP for animations


## 🧩 Game Architecture

The game is built using Object-Oriented Programming principles with the following key components:

- **Sprite Class**: Base class for all game objects that need to be rendered
- **Fighter Class**: Extends Sprite with fighting mechanics and health management
- **Collision Detection**: Precise hit detection for attacks
- **Animation System**: Frame-by-frame sprite animation system

![](img/game/victory.png)

## 🚀 Future Improvements

- Add more characters with unique abilities
- Implement special moves and combo system
- Add sound effects and background music
- Create multiple backgrounds/stages
- Add mobile touch controls