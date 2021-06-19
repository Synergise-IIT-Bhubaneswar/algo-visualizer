import React, { useState, useRef } from "react";
import Header from "../UI/Header/Header";
import AlgorithmOptions from "../UI/Menu/AlgorithmOptions";
import Canvas from "../GraphComponents/Canvas";

const Layout = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(
    AlgorithmOptions[0]
  );

  const [isVisualizing, setIsVisualizing] = useState(false)
  const [startNode, setStartNode] = useState("Start Node")
  const selectStartNode = (node) => {
    setStartNode(node);
  }

  const startVisualizing = () => {
    setIsVisualizing(true)
  }

  const endVisualizing = () => {
    setIsVisualizing(false)
  }

  const selectAlgorithm = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const canvasRef = useRef(null);
  return (
    <div>
      <Header
        startNode={startNode}
        selectStartNode={selectStartNode}
        selectAlgorithm={selectAlgorithm}
        AlgorithmOptions={AlgorithmOptions}
        selectedAlgorithm={selectedAlgorithm}
        canvasRef={canvasRef}
        startVisualizing={startVisualizing}
        isVisualizing={isVisualizing}
      ></Header>
      <Canvas
        startNode={startNode}
        visualizationStart={startVisualizing}
        visualizationEnd={endVisualizing}
        isVisualizing={isVisualizing}
        selectedAlgorithm={selectedAlgorithm}
        ref={canvasRef} />
    </div>
  );
};

export default Layout;
