import React, { Component } from 'react';
import './App.css';
import Box from "./Box";
import {solve} from './solver'

class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
     size: 4
   }
  }

  componentDidMount() {
    let state = {};
    let size = this.state.size;

    state[0] = {
      left: true,
      up: true
    };
    for (let i = 1; i < size - 1; i++) {
      state[i] = {
        up: true
      }
    }
    state[size - 1] = {
      right: true,
      up: true
    };

    for (let i = 1; i < size - 1; i++) {
      state[size * i] = {
        left: true,
      };
      state[(i + 1) * size - 1] = {
        right: true,
      }
    }

    state[(size - 1) * size] = {
      left: true,
      down: true
    };
    for (let i = 1 + (size - 1) * size; i < size * size - 1; i++) {
      state[i] = {
        down: true
      }
    }
    state[size * size - 1] = {
      down: true,
      right: true
    };
    this.setState(state)
  }
  report = (boxId, key, value) => {
    if (['left', 'right', 'up', 'down', 'number'].includes(key)) {
      this.setState({
        [boxId]: Object.assign({}, this.state[boxId], {[key]: value})
      })
    }
  };

  onClick = () => {
    solve(this.state);
  };

  render() {
    const row = (rowNum) => {
      let arr = [];
      for (let i = rowNum * this.state.size; i < (rowNum + 1) * this.state.size; i++) {
        let up = (this.state[i] && this.state[i].up) || false;
        let down = (this.state[i] && this.state[i].down) || false;
        let left = (this.state[i] && this.state[i].left) || false;
        let right = (this.state[i] && this.state[i].right) || false;
        arr.push(<Box report={this.report} up={up} down={down} left={left} right={right}
                      key={i} id={i} topPiece={rowNum === 0} leftPiece={i === rowNum * this.state.size}/>);
      }
      return arr;
    };

    const puzzle = () => {
      let arr = [];
      for(let i = 0; i< this.state.size; i++) {
        arr.push(
          (<div className="sideways">
            {row(i)}
          </div>));
      }
      return arr;
    };

    return (
      <div className="App">
        {puzzle()}
        <button onClick={this.onClick}>Go</button>
      </div>
    );
  }
}

export default App;
