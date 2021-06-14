import React, { ReactElement, useRef, useState } from "react";
import StyledCanvas from "./CanvasStyle";
import Graph from "../GraphComponents/Graph";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  return (
    <Graph />
    // <StyledCanvas ref={canvasRef}>
    //   <Graph />
    // </StyledCanvas>
  );
};

export default Canvas;
