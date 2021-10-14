import { v4 as uuidv4 } from "uuid";
import React from "react";
import Edge from "./Edge";
import Vertex from "./Vertex";
import DfsVisualization from "../../algorithms/DFS/DfsVisualization";
import BfsVisualization from "../../algorithms/BFS/BfsVisualization";
import KruskalVisualization from "../../algorithms/Kruskal/KruskalVisualization";
import PrimVisualization from "../../algorithms/Prim/PrimVisualization";
import DijkstraVisualization from "../../algorithms/Dijkstra/DijkstraVisualization";
import AdjList from "../AdjList/AdjList";
import asyncTimeOut from "../../helpers/asyncTimeOut";
import PositionedSnackbar from "../UI/Components/SnackBar";
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.vertexIDs = [];
    this.edgeRefs = new Map();
    this.vertexRefs = new Map();
    this.adjList = new Map();
    this.directedTo = new Map();
    this.vertexIndices = new Map();
    // this stores the directed edge incident TO a vertex
    this.state = {
      visualize: false,
      noOfVertices: 0,
      vertices: [],
      edges: [],
      parent: [],
      showDialog: false,
      message: "",
    };
  }

  moveEdge = (vertexID, x, y) => {
    for (var i = 0; i < this.adjList.get(vertexID).length; i++) {
      const id = this.adjList.get(vertexID)[i];
      this.edgeRefs.get(id).current.changePosition(vertexID, x, y);
    }
    if (this.directedTo.has(vertexID)) {
      for (var i = 0; i < this.directedTo.get(vertexID).length; i++) {
        const id = this.directedTo.get(vertexID)[i];
        this.edgeRefs.get(id).current.changePosition(vertexID, x, y);
      }
    }
  };

  addVertex = () => {
    var newVertices = this.state.vertices.map((vertex) => vertex);
    const newVertexRef = React.createRef();
    const uniqueID = uuidv4();
    newVertices.push(
      <Vertex
        ref={newVertexRef}
        vertexIndex={this.state.noOfVertices}
        moveIncidentEdges={this.moveEdge}
        uniqueID={uniqueID}
        key={uniqueID}
        getShortestPath={this.getShortestPath}
      />
    );
    this.vertexIndices.set(uniqueID, this.vertexIDs.length);
    this.vertexIDs.push(uniqueID);
    this.vertexRefs.set(uniqueID, newVertexRef);
    this.adjList.set(uniqueID, []);

    this.setState({
      vertices: newVertices,
      noOfVertices: this.state.noOfVertices + 1,
    });
  };

  isEdgePresent = (n1ID, n2ID, isDirected) => {
    for (var i = 0; i < this.adjList.get(n1ID).length; i++) {
      const edgeRef = this.edgeRefs.get(this.adjList.get(n1ID)[i]);
      if (edgeRef.current.props.isDirected && edgeRef.current.n2ID === n2ID) {
        return this.adjList.get(n1ID)[i];
      }
      if (
        !edgeRef.current.props.isDirected &&
        (edgeRef.current.n1ID === n2ID || edgeRef.current.n2ID === n2ID)
      ) {
        return this.adjList.get(n1ID)[i];
      }
    }

    // Directed edge from n2 to n1 exists and user trying to
    // add Un-Directed edge from n1 to n2
    if (!isDirected && this.directedTo.has(n1ID)) {
      for (var i = 0; i < this.directedTo.get(n1ID).length; i++) {
        const edgeRef = this.edgeRefs.get(this.directedTo.get(n1ID)[i]);
        if (edgeRef.current.n1ID == n2ID) return this.directedTo.get(n1ID)[i];
      }
    }
    return false;
  };
  // CASE 1 - Un-Directed edge from n1 to n2 exists
  // Can NOT add any other edge between n1 and n2

  // CASE 2 - Directed edge from n1 to n2 exists
  // Can only add Directed edge from n2 to n1
  // Can NOT add any Un- directed edge between n1 and n2

  addEdge = (n1, n2, isDirected, weight) => {
    const n1ID = this.vertexIDs[n1];
    const n2ID = this.vertexIDs[n2];
    if (this.isEdgePresent(n1ID, n2ID, isDirected) !== false) {
      // console.log("edge already +nt");
      return;
    }

    const newEdgeRef = React.createRef();
    const uniqueID = uuidv4();
    var newEdges = this.state.edges.map((edge) => edge);

    newEdges.push(
      <Edge
        weight={weight}
        ref={newEdgeRef}
        key={uniqueID}
        n1Ref={this.vertexRefs.get(n1ID)}
        n2Ref={this.vertexRefs.get(n2ID)}
        edgeKey={uniqueID}
        isDirected={isDirected}
      />
    );

    this.edgeRefs.set(uniqueID, newEdgeRef);

    this.adjList.get(n1ID).push(uniqueID);
    if (!isDirected) this.adjList.get(n2ID).push(uniqueID);

    if (isDirected) {
      if (this.directedTo.has(n2ID)) this.directedTo.get(n2ID).push(uniqueID);
      else this.directedTo.set(n2ID, [uniqueID]);
    }

    this.setState({
      edges: newEdges,
      parent: [],
    });
  };

  clearCanvas = () => {
    this.vertexIDs = [];
    this.edgeRefs = new Map();
    this.vertexRefs = new Map();
    this.adjList = new Map();
    this.directedTo = new Map();
    this.vertexIndices = new Map();

    this.setState({
      visualize: false,
      noOfVertices: 0,
      vertices: [],
      edges: [],
      parent: [],
    });
    this.props.visualizationEnd();
  };

  // check for optimisation
  deleteVertex = (vertexIndex) => {
    const uniqueID = this.vertexIDs[vertexIndex];
    this.vertexRefs.delete(uniqueID);
    this.vertexIndices.delete(uniqueID);

    const incidentEdges = this.adjList.get(uniqueID);

    for (var i = 0; i < incidentEdges.length; i++) {
      const edgeID = incidentEdges[i];
      const edgeRef = this.edgeRefs.get(edgeID);
      this.edgeRefs.delete(edgeID);

      const connectedVertexID = edgeRef.current.getOtherVertexID(uniqueID);

      if (edgeRef.current.props.isDirected) {
        const updatedNeighbour = this.directedTo
          .get(connectedVertexID)
          .filter((id) => id !== edgeID);

        this.directedTo.set(connectedVertexID, updatedNeighbour);
      } else {
        const updatedNeighbour = this.adjList
          .get(connectedVertexID)
          .filter((id) => id !== edgeID);

        this.adjList.set(connectedVertexID, updatedNeighbour);
      }
    }

    if (this.directedTo.has(uniqueID)) {
      const incomingDirectedEdges = this.directedTo.get(uniqueID);
      for (var i = 0; i < incomingDirectedEdges.length; i++) {
        const edgeID = incomingDirectedEdges[i];
        const edgeRef = this.edgeRefs.get(edgeID);
        this.edgeRefs.delete(edgeID);
        const connectedVertexID = edgeRef.current.getOtherVertexID(uniqueID);

        const updatedNeighbour = this.adjList
          .get(connectedVertexID)
          .filter((id) => id !== edgeID);

        this.adjList.set(connectedVertexID, updatedNeighbour);
      }
      this.directedTo.delete(uniqueID);
    }

    this.vertexIDs.splice(vertexIndex, 1);
    this.adjList.delete(uniqueID);

    for (i = vertexIndex; i < this.state.noOfVertices - 1; i++) {
      const ind = this.vertexRefs.get(this.vertexIDs[i]).current.state
        .vertexIndex;
      if (ind > vertexIndex) {
        this.vertexRefs
          .get(this.vertexIDs[i])
          .current.changeVertexIndex(ind - 1);
      }
    }

    this.setState({
      noOfVertices: this.state.noOfVertices - 1,
      vertices: this.state.vertices.filter(
        (vertex) => vertex.props.uniqueID !== uniqueID
      ),
      edges: this.state.edges.filter(
        (edge) =>
          edge.props.n1Ref.current.id !== uniqueID &&
          edge.props.n2Ref.current.id !== uniqueID
      ),
      parent: [],
    });
  };

  deleteEdge = (n1, n2) => {
    const n1ID = this.vertexIDs[n1];
    const n2ID = this.vertexIDs[n2];

    var toDeleteEdgeID = this.isEdgePresent(n1ID, n2ID, true);
    if (toDeleteEdgeID === false) {
      // console.log("edge NOT +nt");
      return;
    }

    const toDeleteEdgeRef = this.edgeRefs.get(toDeleteEdgeID);
    this.edgeRefs.delete(toDeleteEdgeID);

    const updated1Neighbour = this.adjList
      .get(n1ID)
      .filter((edgeID) => edgeID !== toDeleteEdgeID);
    this.adjList.set(n1ID, updated1Neighbour);

    if (toDeleteEdgeRef.current.props.isDirected === false) {
      const updated2Neighbour = this.adjList
        .get(n2ID)
        .filter((edgeID) => edgeID !== toDeleteEdgeID);
      this.adjList.set(n2ID, updated2Neighbour);
    }

    if (toDeleteEdgeRef.current.props.isDirected) {
      const updated = this.directedTo
        .get(n2ID)
        .filter((edgeID) => edgeID !== toDeleteEdgeID);
      this.directedTo.set(n2ID, updated);
    }

    this.setState({
      edges: this.state.edges.filter(
        (edge) => edge.props.edgeKey !== toDeleteEdgeID
      ),
      parent: [],
    });
  };

  // add code for getting starting vertex as input
  startVisualizing = () => {
    this.props.visualizationStart();
  };

  endVisualizing = () => {
    this.props.visualizationEnd();
  };

  reset = () => {
    this.vertexRefs.forEach((ref) => ref.current.changeBackgroundColor("aqua"));
    this.edgeRefs.forEach((ref) => ref.current.changeBackgroundColor("black"));
    this.props.visualizationEnd();
  };

  setParents = (parent) => {
    this.setState({ parent: parent });
  };

  getShortestPath = async (id) => {
    let shortestPath = [];

    const delayTime = this.props.visualizationSpeed;
    if (
      !this.props.isVisualizing &&
      this.props.selectedAlgorithm === "Dijkstra"
    ) {
      let vertexId = id;
      if (!this.vertexIndices.has(vertexId)) return;

      let vertexIndex = this.vertexIndices.get(vertexId);
      // parent[i] contains the edge in the shortest path
      if (
        this.state.parent.length <= vertexIndex ||
        vertexIndex === this.props.startNode
      )
        return;
      else if (this.state.parent[vertexIndex] === -1) {
        let message = "Vertex is not connected to source";
        this.setState({ message: message, showDialog: true });
      } else {
        //Resetting the previous path to the original color
        this.edgeRefs.forEach((ref) => {
          if (ref.current.state.styles.stroke === "red")
            ref.current.changeBackgroundColor("#01B878");
        });

        while (this.state.parent[vertexIndex] !== -1) {
          shortestPath.push(vertexIndex);
          this.state.parent[vertexIndex].current.changeBackgroundColor("red");
          const connectedVertexId =
            this.state.parent[vertexIndex].current.getOtherVertexID(vertexId);
          const connectedVertexIndex =
            this.vertexIndices.get(connectedVertexId);
          vertexIndex = connectedVertexIndex;
          vertexId = connectedVertexId;
          await asyncTimeOut(delayTime);
        }
        shortestPath.push(this.props.startNode);
        shortestPath.reverse();
        let message = "Shortest path " + shortestPath.join(" -> ");
        this.setState({ message: message, showDialog: true });
      }
    }
  };

  handleClose = () => {
    this.setState({ showDialog: false });
  };

  render() {
    return (
      <>
        <div className="graph">
          {this.state.vertices}
          {this.state.edges}
          {this.props.isVisualizing &&
          this.props.selectedAlgorithm === "DFS" ? (
            <DfsVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
            />
          ) : null}
          {this.props.isVisualizing &&
          this.props.selectedAlgorithm === "BFS" ? (
            <BfsVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
            />
          ) : null}
          {this.props.isVisualizing &&
          this.props.selectedAlgorithm === "Kruskal MST" ? (
            <KruskalVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
            />
          ) : null}
          {this.props.isVisualizing &&
          this.props.selectedAlgorithm === "Prim MST" ? (
            <PrimVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
            />
          ) : null}
          {this.props.isVisualizing &&
          this.props.selectedAlgorithm === "Dijkstra" ? (
            <DijkstraVisualization
              startingVertex={parseInt(this.props.startNode)}
              noOfVertices={this.state.noOfVertices}
              vertexIDs={this.vertexIDs}
              vertexRefs={this.vertexRefs}
              edgeRefs={this.edgeRefs}
              adjList={this.adjList}
              endVisualizing={this.endVisualizing}
              visualizationSpeed={this.props.visualizationSpeed}
              setParents={this.setParents}
            />
          ) : null}
        </div>
        <AdjList
          adjList={this.adjList}
          nodeIndices={this.vertexIDs}
          edgeRefs={this.edgeRefs}
          open={this.props.open}
        ></AdjList>
        <PositionedSnackbar
          open={this.state.showDialog}
          message={this.state.message}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}

export default Canvas;
