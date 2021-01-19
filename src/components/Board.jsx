import React, { Component } from "react";
import { genRandString } from "../utils";
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
    const { numOfSquares } = this.state;
    let grid = [];

    for (let i = 0; i < numOfSquares; i++) {
      grid[i] = [];

      for (let j = 0; j < numOfSquares; j++) {
        grid[i][j] = this.getBlankNode();
      }
    }

    this.setState({ grid });
  }

  getBlankNode() {
    return <Node key={genRandString()} />;
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
