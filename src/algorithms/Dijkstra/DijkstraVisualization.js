import { useEffect } from "react";
import asyncTimeOut from "../../helpers/asyncTimeOut";
import MinHeap from "../../helpers/dataStructures/MinHeap";

//const delayTime = 1000;
const DijkstraVisualization = (props) => {
  const delayTime = props.visualizationSpeed;

  const vertexIndices = new Map();
  const parent = new Array(props.noOfVertices);

  const visualizeDijkstra = async () => {
    const minHeap = new MinHeap(props.noOfVertices);
    minHeap.decreaseKey(props.startingVertex, 0);

    while (!minHeap.isEmpty()) {
      const currWeight = minHeap.getMinValue();
      const vertexID = props.vertexIDs[minHeap.extractMin()];
      const neighbours = props.adjList
        .get(vertexID)
        .map((edgeID) => props.edgeRefs.get(edgeID));

      props.vertexRefs.get(vertexID).current.changeBackgroundColor("#01B878");
      await asyncTimeOut(delayTime);

      for (var i = 0; i < neighbours.length; i++) {
        const connectedVertexIndex = vertexIndices.get(
          neighbours[i].current.getOtherVertexID(vertexID)
        );
        if (!minHeap.isPresent(connectedVertexIndex)) continue;
        const weight = parseInt(neighbours[i].current.props.weight || 0);

        neighbours[i].current.changeBackgroundColor("#ED3C61");
        await asyncTimeOut(delayTime);

        if (minHeap.decreaseKey(connectedVertexIndex, currWeight + weight)) {
          const prevConnectedEdge = parent[connectedVertexIndex];

          if (prevConnectedEdge != -1)
            prevConnectedEdge.current.changeBackgroundColor("#CDCDCD");

          neighbours[i].current.changeBackgroundColor("#01B878");
          parent[connectedVertexIndex] = neighbours[i];
        } else {
          neighbours[i].current.changeBackgroundColor("#CDCDCD");
        }

        await asyncTimeOut(delayTime);
      }
    }
    props.setParents(parent);
    props.endVisualizing();
  };

  useEffect(() => {
    for (var i = 0; i < props.noOfVertices; i++) {
      vertexIndices.set(props.vertexIDs[i], i);
    }
    parent.fill(-1);
    visualizeDijkstra();
  }, []);

  return <div></div>;
};

export default DijkstraVisualization;
