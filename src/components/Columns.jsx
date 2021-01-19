import React from "react";
import Node from "./Node";

const Columns = ({ columnCount }) => {
  const cols = [];

  for (let i = 0; i < columnCount; i++) {
    cols.push(<Node>Hello</Node>);
  }

  return cols;
};

export default Columns;
