import React from "react";

class Edge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      X1: this.props.X1,
      Y1: this.props.Y1,
      X2: this.props.X2,
      Y2: this.props.Y2,
      styles: { stroke: "black" },
    };
  }

  changePosition1 = (x, y) => {
    this.setState({
      X1: x,
      Y1: y,
    });
  };
  changePosition2 = (x, y) => {
    this.setState({
      X2: x,
      Y2: y,
    });
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
