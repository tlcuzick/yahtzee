import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(evt) {
    this.props.handleClick(this.props.idx);
  }
  render() {
    let dieNumTxt;
    switch (this.props.val) {
      case 1:
        dieNumTxt = "one";
        break;
      case 2:
        dieNumTxt = "two";
        break;
      case 3:
        dieNumTxt = "three";
        break;
      case 4:
        dieNumTxt = "four";
        break;
      case 5:
        dieNumTxt = "five";
        break;
      case 6:
        dieNumTxt = "six";
        break;
      default:
        break;
    }
    const rollingClass = (this.props.isRolling && !this.props.locked)? ' Die-rolling' : null;
    const allClasses = `fas fa-dice-${dieNumTxt} fa-5x Die Die${this.props.locked ? '-locked' : null} ${rollingClass}`
    
    return (
      <i
        className={allClasses}
        onClick={this.handleClick}
      ></i>
    );
  }
}

export default Die;
