import React from "react";
import Edge from "./Edge";
import Vertex from "./Vertex";

const vertexRadius = 25;
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.noOfEdges = 0;
    this.edgeRefs = [];
    this.vertexRefs = [];
    this.adjList = [];
    this.state = {
      noOfVertices: 0,
      vertices: [],
      edges: [],
    };
  }

  moveEdge = (nodeIndex, x, y) => {
    var i;
    for (i = 0; i < this.edgeRefs[nodeIndex].length; i++) {
      if (this.edgeRefs[nodeIndex][i][1] === "pos1") {
        this.edgeRefs[nodeIndex][i][0].current.changePosition1(x, y);
      } else {
        this.edgeRefs[nodeIndex][i][0].current.changePosition2(x, y);
      }
    }
  };

  addVertex = () => {
    var newVertices = this.state.vertices.map((vertex) => vertex);
    const newVertexRef = React.createRef();
    newVertices.push(
      <Vertex
        ref={newVertexRef}
        nodeIndex={this.state.noOfVertices}
        moveIncidentEdges={this.moveEdge}
        key={this.state.noOfVertices}
      />
    );
    this.edgeRefs.push([]);
    this.vertexRefs.push(newVertexRef);

    this.adjList.push([]);
    this.setState({
      vertices: newVertices,
      noOfVertices: this.state.noOfVertices + 1,
    });
  };

  addEdge = (n1, n2) => {

    const newEdgeRef = React.createRef();
    var newEdges = this.state.edges.map((edge) => edge);

    const position1 = this.vertexRefs[n1].current.state.styles;
    const position2 = this.vertexRefs[n2].current.state.styles;
    console.log(this.vertexRefs[n1].current);
    newEdges.push(
      <Edge
        ref={newEdgeRef}
        key={this.noOfEdges}
        X1={position1.left + vertexRadius}
        Y1={position1.top + vertexRadius}
        X2={position2.left + vertexRadius}
        Y2={position2.top + vertexRadius}
      />
    );

    this.noOfEdges = this.noOfEdges + 1;

    this.edgeRefs[n1].push([newEdgeRef, "pos1"]);
    this.edgeRefs[n2].push([newEdgeRef, "pos2"]);

    this.adjList[n1].push(n2);
    this.adjList[n2].push(n1);

    this.setState({
      edges: newEdges,
    });
  };

  // myfun1 = (e) => {
  //   this.setState({ fromVertex: e.target.value });
  // };
  // myfun2 = (e) => {
  //   this.setState({ toVertex: e.target.value });
  // };

  render() {
    return (
      <div className="graph">
        {/* <div style={{ position: "fixed", margin: "100px" }}>
          <button onClick={this.addVertex}> Add node</button>
          <div>
            <input />
            <label>From Node</label>
            <input value={this.state.fromVertex} onChange={this.myfun1} />
            <label>To Node</label>
            <input value={this.state.toVertex} onChange={this.myfun2} />
          </div>
          <p>No of vertices: {this.state.noOfVertices}</p>
          <button onClick={this.addEdge}> Add edge</button>
        </div> */}
        {this.state.vertices}
        {this.state.edges}
      </div>
    );
  }
}

export default Canvas;
