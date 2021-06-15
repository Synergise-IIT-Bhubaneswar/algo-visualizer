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
          <line
            className="line"
            style={this.state.styles}
            x1={this.state.X1}
            y1={this.state.Y1}
            x2={this.state.X2}
            y2={this.state.Y2}
          />
        </svg>
      </div>
    );
  }
}

export default Edge;
