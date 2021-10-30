import React, { Component } from 'react';

export class Timer extends Component {
  constructor(props) {
    super(props);

    this.timer = {};

    this.state = {
      seconds: this.props.seconds,
      resetTimer: this.props.resetTimer,
    };
    this.countDown = this.countDown.bind(this);
    this.changeSeconds = this.changeSeconds.bind(this);
  }

  componentDidMount() {
    this.countDown();
  }

  componentDidUpdate(prevProps) {
    const { stopTimer, seconds, resetTimer } = this.props;

    //reset timer
    if (resetTimer !== prevProps.resetTimer) {
      clearInterval(this.timer);
      this.changeSeconds();
    }

    //change timer
    if (prevProps.seconds !== seconds) {
      clearInterval(this.timer);
      this.changeSeconds();
    }

    //stop timer
    if (stopTimer) {
      return clearInterval(this.timer);
    }
  }

  changeSeconds() {
    this.countDown();
  }

  countDown() {
    this.setState({ seconds: this.props.seconds });
    
    const { finishTime } = this.props;

    this.timer = setInterval(() => {
      this.setState({ seconds: this.state.seconds - 1 });
      if (this.state.seconds === 0) {
        finishTime();
        clearInterval(this.timer);
      }
    }, 1000);
  }

  render() {
    const { seconds } = this.state;
    return <div>{seconds}</div>;
  }
}
