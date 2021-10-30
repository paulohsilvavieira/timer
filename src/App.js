import React from 'react';
import { Timer } from './Timer';

class App extends React.Component {
  constructor() {
    super();
    this.startTime = this.startTime.bind(this);
    this.handleStopTime = this.handleStopTime.bind(this);
    this.handleDificult = this.handleDificult.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.finishTime = this.finishTime.bind(this);

    this.dificult = {
      hard: 15,
      medium: 10,
      easy: 0,
    };

    this.state = {
      seconds: 0,
      mostraMensagem: false,
      dificult: 'easy',
      stopTimer: false,
      resetTimer: false,
    };
  }

  componentDidMount() {
    this.startTime();
  }

  startTime() {
    const seconds = 30 - this.dificult[this.state.dificult];

    this.setState({
      seconds: seconds,
    });
  }

  handleStopTime() {
    this.setState({ stopTimer: true });
  }

  handleReset() {
    this.setState({
      resetTimer: !this.state.resetTimer,
      stopTimer: false,
      mostraMensagem: false,
    });
  }

  handleDificult(dificultName) {
    this.setState({ stopTimer: true });

    this.setState({ dificult: dificultName });
    const seconds = 30 - this.dificult[dificultName];
    this.setState({
      seconds: seconds,
      stopTimer: false,
    });
  }

  finishTime() {
    this.setState({ mostraMensagem: true });
  }

  render() {
    const { seconds, resetTimer, stopTimer, dificult, mostraMensagem } =
      this.state;

    return (
      <>
        {seconds !== 0 && (
          <Timer
            seconds={seconds}
            resetTimer={resetTimer}
            stopTimer={stopTimer}
            finishTime={this.finishTime}
          />
        )}
        {mostraMensagem && <p>Acabou o tempo</p>}
        Dificuldade: {dificult}
        <br />
        <br />
        <button type='button' onClick={this.handleStopTime}>
          Stop
        </button>
        <button type='button' onClick={this.handleReset}>
          Reset
        </button>
        <br />
        <br />
        <button
          type='button'
          className={`${mostraMensagem ? 'teste' : 'tete2'} teste`}
          onClick={() => this.handleDificult('easy')}
        >
          Facil
        </button>
        <button type='button' onClick={() => this.handleDificult('medium')}>
          Normal
        </button>
        <button type='button' onClick={() => this.handleDificult('hard')}>
          Dificil
        </button>
      </>
    );
  }
}

export default App;
