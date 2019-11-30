import React, { Component } from 'react';
import RuleRow from './RuleRow';
import './ScoreTable.css';
import { ones, twos, threes, fours, fives, sixes, threeOfKind, fourOfKind, fullHouse, smallStraight, largeStraight, yahtzee, chance } from './Rules';


class ScoreTable extends Component {

  render() {
    const { scores, doScore } = this.props;
    const totalScore = Object.values(scores).reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);

    return (
      <div className="ScoreTable">
        <section className="ScoreTable-section">
          <h2>Upper</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow name="Ones" score={scores.ones} doScore={evt => doScore("ones", ones.evalRoll)} desc={ones.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Twos" score={scores.twos} doScore={evt => doScore("twos", twos.evalRoll)} desc={twos.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Threes" score={scores.threes} doScore={evt => doScore("threes", threes.evalRoll)} desc={threes.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Fours" score={scores.fours} doScore={evt => doScore("fours", fours.evalRoll)} desc={fours.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Fives" score={scores.fives} doScore={evt => doScore("fives", fives.evalRoll)} desc={fives.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Sixes" score={scores.sixes} doScore={evt => doScore("sixes", sixes.evalRoll)} desc={sixes.desc} isRolling={this.props.isRolling} />
            </tbody>
          </table>
        </section>
        <section className="ScoreTable-section ScoreTable-section-lower">
          <h2>Lower</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow name="Three of Kind" score={scores.threeOfKind} doScore={evt => doScore("threeOfKind", threeOfKind.evalRoll)} desc={threeOfKind.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Four of Kind" score={scores.fourOfKind} doScore={evt => doScore("fourOfKind", fourOfKind.evalRoll)} desc={fourOfKind.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Full House" score={scores.fullHouse} doScore={evt => doScore("fullHouse", fullHouse.evalRoll)} desc={fullHouse.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Small Straight" score={scores.smallStraight} doScore={evt => doScore("smallStraight", smallStraight.evalRoll)} desc={smallStraight.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Large Straight" score={scores.largeStraight} doScore={evt => doScore("largeStraight", largeStraight.evalRoll)} desc={largeStraight.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Yahtzee" score={scores.yahtzee} doScore={evt => doScore("yahtzee", yahtzee.evalRoll)} points={yahtzee.score} desc={yahtzee.desc} isRolling={this.props.isRolling} />
              <RuleRow name="Chance" score={scores.chance} doScore={evt => doScore("chance", chance.evalRoll)} desc={chance.desc} isRolling={this.props.isRolling} />
            </tbody>
          </table>
        </section>
        <section className="ScoreTable-section">
          <h2>Total Score: {totalScore}</h2>
        </section>        
      </div>
    )
  }
}

export default ScoreTable;