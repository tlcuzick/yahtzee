import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {
  render() {
    const active = (this.props.score === undefined) && (!this.props.isRolling) ;
    
    return (
      <tr className={`RuleRow ${active ? 'RuleRow-active' : 'RuleRow-disabled'}`} onClick={this.props.doScore}>
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">{active ? this.props.desc : this.props.score}</td>
      </tr>
    )
  }
}

export default RuleRow;