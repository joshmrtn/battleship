# Battleship

> "You sank my battleship!"

My solution to The Odin Project's [Project: Battleship](https://www.theodinproject.com/lessons/node-path-javascript-battleship). It is a playable clone of the classic [Battleship](<https://en.wikipedia.org/wiki/Battleship_(game)>) game.

> [!WARNING]
> This project is under active development and subject to change at any time.

## Run

```bash
# Starts the webpack dev server
npm run serve
```

## Roadmap

This is a rough sketch of the development roadmap/goals. The "Core" and "Extra" goals come directly from the project assignment; "Stretch" includes my own thoughts of how I could enhance the game further.

- [ ] Core
  - [x] Create `Ship` class
    - [x] Implement `hit()` method
    - [x] Implement `isSunk()` method
  - [x] Create `Gameboard` class
    - [x] Implement `receiveAttack()` method
  - [x] Create `Player` class
  - [ ] Create user interface
  - [ ] Implement game loop against computer player
  - [ ] Implement system to allow players to place ships
- [ ] Extra
  - [ ] Implement drag and drop placement of ships
  - [ ] Create a 2-player mode, pass and play, with a 'pass device' screen so players can't see each other's boards
  - [ ] Polish computer player's AI by having it try adjacent slots to previous hits.
- [ ] Stretch
  - [ ] Improved visuals (make the tiles actually look like ships)
  - [ ] Online multiplayer
  - [ ] "[Salvo](<https://en.wikipedia.org/wiki/Battleship_(game)#Variations>)" game mode, and other similar variants.
  - [ ] Variable grid sizes; variable ship counts/sizes
  - [ ] Sound effects
  - [ ] Animations
