import React, { Component } from "react";

class Vertex extends Component {
  constructor(props) {
    super(props);
    this.diffX = 0;
    this.diffY = 0;
    this.isDragging = false;
    this.state = { styles: { left: 500, top: 300, backgroundColor: "aqua" } };
  }

  dragStart = (e) => {
    this.diffX = e.screenX - e.currentTarget.getBoundingClientRect().left;
    this.diffY = e.screenY - e.currentTarget.getBoundingClientRect().top;
    this.isDragging = true;
    this.setState({
      styles: {
        left: this.state.styles.left,
        top: this.state.styles.top,
        backgroundColor: "teal",
      },
    });
  };
  dragEnd = () => {
    this.isDragging = false;
    this.setState({
      styles: {
        left: this.state.styles.left,
        top: this.state.styles.top,
        backgroundColor: "aqua",
      },
    });
  };

  dragging = (e) => {
    if (this.isDragging) {
      const newLeft = e.screenX - this.diffX;
      const newTop = e.screenY - this.diffY;
      this.setState({
        styles: {
          left: newLeft,
          top: newTop,
          backgroundColor: this.state.styles.backgroundColor,
        },
      });

      // changing edge position when node moves
      const pos = e.currentTarget.getBoundingClientRect();
      this.props.moveIncidentEdges(
        this.props.nodeIndex,
        (pos.left + pos.right) / 2,
        (pos.top + pos.bottom) / 2
      );
    }
  };

  changeBackgroundColor = (color) => {
    this.setState({
      styles: {
        left: this.state.styles.left,
        top: this.state.styles.top,
        backgroundColor: color,
      },
    });
  };

  render() {
    return (
      <div
        className="drag"
        style={this.state.styles}
        onMouseDown={this.dragStart}
        onMouseMove={this.dragging}
        onMouseUp={this.dragEnd}
      >
        <h3>{this.props.nodeIndex} </h3>
      </div>
    );
  }
}

export default Vertex;
