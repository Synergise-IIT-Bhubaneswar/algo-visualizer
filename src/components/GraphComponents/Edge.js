import React from "react";

const vertexRadius = 25;
class Edge extends React.Component {
  constructor(props) {
    super(props);
    this.n1ID = this.props.n1Ref.current.id;
    this.n2ID = this.props.n2Ref.current.id;
    this.state = {
      X1: this.props.n1Ref.current.state.styles.left + vertexRadius,
      Y1: this.props.n1Ref.current.state.styles.top + vertexRadius,
      X2: this.props.n2Ref.current.state.styles.left + vertexRadius,
      Y2: this.props.n2Ref.current.state.styles.top + vertexRadius,
      styles: { stroke: "black" },
    };
  }

  changePosition = (id, x, y) => {
    if (id === this.n1ID) {
      this.setState({
        X1: x,
        Y1: y,
      });
    } else {
      this.setState({
        X2: x,
        Y2: y,
      });
    }
  };

  getOtherVertexID = (id) => {
    if (id === this.n1ID) return this.n2ID;
    else if (id === this.n2ID) return this.n1ID;
    else return null;
  };

  changeBackgroundColor = (color) => {
    this.setState({
      styles: {
        stroke: color,
      },
    });
  };

  render() {
    return (
      <div className="div-line">
        <svg className="svg-line">
          <defs>
            <marker
              orient="auto"
              id={this.props.edgeKey}
              markerWidth={6}
              markerHeight={4}
              refX={3}
              refY={2}
              style={{ overflow: "visible" }}
            >
              <text x="3" y="0" fontSize="6">{this.props.weight}</text>
              {this.props.isDirected && (<polygon points="0 0, 6 2, 0 4" />)}
            </marker>
          </defs>
          <polyline
            points={`${this.state.X1},${this.state.Y1},${(this.state.X1 + this.state.X2) / 2
              },${(this.state.Y1 + this.state.Y2) / 2},${this.state.X2},${this.state.Y2
              }`}
            stroke={this.state.styles.stroke}
            strokeWidth="4px"
            markerMid={
              // this.props.isDirected ? `url(#${this.props.edgeKey})` : "none"
              `url(#${this.props.edgeKey})`
            }
          />
        </svg>
      </div>
    );
  }
}

export default Edge;
