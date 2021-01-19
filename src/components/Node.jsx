import React from "react";

const Node = ({ children }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        padding: "auto",
        textAlign: "center",
        border: "2px solid pink",
      }}
    >
      {children}
    </div>
  );
};

export default Node;
