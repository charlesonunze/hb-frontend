import React, { Component } from "react";
import { genRandString, genRandPositions } from "../utils";
import Node from "./Node";

class Board extends Component {
  state = {
    numOfSquares: 5,
    grid: [],
    currentPosition: "",
    spritePositions: [],
    moveCount: 0,
    gameDone: false,
  };

  componentDidMount() {
    let numOfSquares = Number(window.prompt("Type a number", ""));

    while (numOfSquares < 5) {
      numOfSquares = Number(
        window.prompt(`Please enter a number greater than ${numOfSquares}`, "")
      );
    }

    let grid = [];

    for (let i = 0; i < numOfSquares; i++) {
      grid[i] = [];

      for (let j = 0; j < numOfSquares; j++) {
        grid[i][j] = this.getBlankNode();
      }
    }

    window.addEventListener("keydown", this.handleKeyPress);

    const middlePosition = this.getMiddlePosition(grid);
    const currentPosition = `${middlePosition.x}${middlePosition.y}`;
    const spritePositions = this.getSpritePositions(
      middlePosition,
      numOfSquares
    );

    grid = this.paintBoard(grid, middlePosition, spritePositions);

    this.setState({ grid, numOfSquares, currentPosition, spritePositions });
  }

  paintBoard(grid, middlePosition, spritePositions) {
    this.renderSprites(grid, spritePositions);
    this.renderPlayer(grid, middlePosition);
    return grid;
  }

  getBlankNode() {
    return <Node key={genRandString()} />;
  }

  renderPlayer(grid, middlePosition) {
    const { x, y } = middlePosition;

    grid[x][y] = this.getPlayerNode();

    return grid;
  }

  getPlayerNode() {
    return (
      <Node key={genRandString()}>
        <p style={{ margin: "0 auto" }}>mario</p>
      </Node>
    );
  }

  renderSprites(grid, spritePositions) {
    for (let i = 0; i < spritePositions.length; i++) {
      const x = spritePositions[i][0];
      const y = spritePositions[i][1];

      grid[x][y] = this.getSpriteNode();
    }

    return grid;
  }

  removeSprite() {
    const { currentPosition, spritePositions } = this.state;

    const _set = new Set(spritePositions);

    if (_set.has(currentPosition)) _set.delete(currentPosition);

    this.setState({ spritePositions: Array.from(_set) });

    if (this.state.spritePositions.length < 1) {
      return this.setState({ gameDone: true });
    }
  }

  handleKeyPress = (e) => {
    switch (e.keyCode) {
      case 37:
        this.moveLeft();
        break;

      case 38:
        this.moveUp();
        break;

      case 39:
        this.moveRight();
        break;

      case 40:
        this.moveDown();
        break;

      default:
        break;
    }
  };

  moveLeft() {
    const { currentPosition, grid, moveCount, gameDone } = { ...this.state };

    if (gameDone) return;

    let x = parseInt(currentPosition[0]);
    let y = parseInt(currentPosition[1]);

    grid[x][y] = this.getBlankNode();

    if (y === 0) return;

    y -= 1;

    grid[x][y] = this.getPlayerNode();

    this.setState({
      grid,
      currentPosition: `${x}${y}`,
      moveCount: moveCount + 1,
    });

    this.removeSprite();
  }

  moveRight() {
    const { currentPosition, numOfSquares, grid, moveCount, gameDone } = {
      ...this.state,
    };

    if (gameDone) return;

    const last = numOfSquares - 1;

    let x = parseInt(currentPosition[0]);
    let y = parseInt(currentPosition[1]);

    grid[x][y] = this.getBlankNode();

    if (y === last) return;

    y += 1;

    grid[x][y] = this.getPlayerNode();

    this.setState({
      grid,
      currentPosition: `${x}${y}`,
      moveCount: moveCount + 1,
    });

    this.removeSprite();
  }

  moveUp() {
    const { currentPosition, grid, moveCount, gameDone } = { ...this.state };

    if (gameDone) return;

    let x = parseInt(currentPosition[0]);
    let y = parseInt(currentPosition[1]);

    grid[x][y] = <Node key={genRandString()} />;

    if (x === 0) return;

    x -= 1;

    grid[x][y] = this.getPlayerNode();

    this.setState({
      grid,
      currentPosition: `${x}${y}`,
      moveCount: moveCount + 1,
    });

    this.removeSprite();
  }

  moveDown() {
    const { currentPosition, numOfSquares, grid, moveCount, gameDone } = {
      ...this.state,
    };

    if (gameDone) return;

    const last = numOfSquares - 1;

    let x = parseInt(currentPosition[0]);
    let y = parseInt(currentPosition[1]);

    grid[x][y] = this.getBlankNode();

    if (x === last) return;

    if (x === last && y === last) return;

    x += 1;

    grid[x][y] = this.getPlayerNode();

    this.setState({
      grid,
      currentPosition: `${x}${y}`,
      moveCount: moveCount + 1,
    });

    this.removeSprite();
  }

  getSpriteNode() {
    return (
      <Node key={genRandString()}>
        <h1 style={{ margin: "0 auto" }}>O</h1>
      </Node>
    );
  }

  getMiddlePosition(grid) {
    const row = grid[Math.floor(grid.length / 2)];
    const x = Math.floor(grid.length / 2);
    const y = Math.floor(row.length / 2);

    return { x, y };
  }

  getSpritePositions(positions, numOfSquares) {
    let middlePosition = `${positions.x}${positions.y}`;
    return genRandPositions(numOfSquares, middlePosition);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    const {
      numOfSquares,
      currentPosition,
      grid,
      moveCount,
      gameDone,
    } = this.state;

    const cellWidth = `${54 * numOfSquares}px`;

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <p>
            Number of moves: <b>{moveCount}</b>{" "}
          </p>

          {gameDone ? alert(`done ${moveCount}`) : null}
        </div>

        <br />

        <div
          key={`${currentPosition}`}
          className="board"
          style={{
            width: cellWidth,
            display: "flex",
            flexWrap: "wrap",
            textAlign: "center",
            margin: "0 auto",
          }}
        >
          {grid}
        </div>
      </div>
    );
  }
}

export default Board;
