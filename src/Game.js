import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array(NUM_DICE).fill().map(() => Math.ceil(Math.random() * 6)),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      isRolling: false,
      gameOver: false
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);    
    this.resetGame = this.resetGame.bind(this);        
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState({isRolling: true});
    setTimeout(() => {
      this.setState(st => ({
        dice: st.dice.map((d, i) =>
          st.locked[i] ? d : Math.ceil(Math.random() * 6)
        ),
        locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
        rollsLeft: st.rollsLeft - 1,
        isRolling: false
      }));
    }, 1000);
  }
  
  resetGame(evt) {
    this.setState({
      dice: Array(NUM_DICE).fill().map(() => Math.ceil(Math.random() * 6)),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      isRolling: false,
      gameOver: false
    });    
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if(this.state.rollsLeft > 0) {
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    const roundsLeft = Object.values(this.state.scores).filter(score => score === undefined).length - 1;    
    
    if((this.state.scores[rulename] === undefined) && (!this.state.isRolling)) {
      this.setState(st => ({
        scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false),
        gameOver: roundsLeft > 0 ? false : true
      }));

      if(roundsLeft > 0) {
        this.roll();        
      }
    }
  }

  render() {
    let button;
    this.state.gameOver ? (
      button = 
              <button
                className='Game-reroll'
                disabled={this.state.locked.every(x => x) || this.state.isRolling}
                onClick={this.resetGame}
              >Restart game
              </button>
      ) :
      (
        button = 
              <button
                className='Game-reroll'
                disabled={this.state.locked.every(x => x) || this.state.isRolling}
                onClick={this.roll}
              >
                {`${this.state.rollsLeft} ${this.state.rollsLeft === 1 ? 'Reroll' : 'Rerolls'} Left`}
              </button>        
        )
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              isRolling={this.state.isRolling}
            />
            <div className='Game-button-wrapper'>
              {button}
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} isRolling={this.state.isRolling} />
      </div>
    );
  }
}

export default Game;
