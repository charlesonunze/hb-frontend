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

    const middlePosition = this.getMiddlePosition(grid);
    const currentPosition = `${middlePosition.x}${middlePosition.y}`;
    const spritePositions = this.getSpritePositions(
      middlePosition,
      numOfSquares
    );

    grid = this.paintBoard(grid, middlePosition, spritePositions);

    this.setState({ grid, numOfSquares, currentPosition });
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
