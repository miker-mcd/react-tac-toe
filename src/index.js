import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function ToggleButton(props) {
  return <button onClick={props.onClick}>{props.sortStatus}</button>;
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    var squares = [];
    var rows = [];
    var squareNumber = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squares.push(this.renderSquare(squareNumber));
        squareNumber++;
      }
      rows.push(
        <div key={i} className="board-row">
          {squares}
        </div>
      );
      squares = [];
    }
    return <div>{rows}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      locations: [null],
      stepNumber: 0,
      xIsNext: true,
      isToggleOn: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const locations = this.state.locations.slice(0, this.state.stepNumber + 1);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    locations.push(this.indexToLocation(i));
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      locations: locations,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  indexToLocation(index) {
    let location;
    switch (index) {
      case 0:
        location = [1, 1];
        break;
      case 1:
        location = [1, 2];
        break;
      case 2:
        location = [1, 3];
        break;
      case 3:
        location = [2, 1];
        break;
      case 4:
        location = [2, 2];
        break;
      case 5:
        location = [2, 3];
        break;
      case 6:
        location = [3, 1];
        break;
      case 7:
        location = [3, 2];
        break;
      case 8:
        location = [3, 3];
        break;
      default:
        location = null;
    }
    return location;
  }

  handleToggle() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const locations = this.state.locations;
    let moves = history.map((step, move) => {
      const location = locations[move] ? locations[move] : '';
      const row = 'R: ' + location[0];
      const col = 'C: ' + location[1];
      const desc = move ? 'Go to move #' + move + ' (' + col + ' ' + row + ')' : 'Go to game start';
      if (current.squares === step.squares) {
        return (
          <li key={move} className="active">
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let sortStatus;
    if (this.state.isToggleOn) {
      sortStatus = 'Descending';
      moves = moves.reverse();
    } else {
      sortStatus = 'Ascending';
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ToggleButton sortStatus={sortStatus} onClick={this.handleToggle} />
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
