import * as React from 'react';

// Propsの型定義（今回は不要だが明示）
type CounterProps = {};

// Stateの型定義
type CounterState = {
  currentCount: number;
};

export class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {  // ← props を受け取るよう修正
    super(props);                      // ← super(props) に修正
    this.state = { currentCount: 0 };
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>This is a simple example of a React component.</p>
        <p>Current count: <strong>{this.state.currentCount}</strong></p>
        <button className='btn-primary' onClick={() => this.incrementCounter()}>
          Increment
        </button>
        <button className='btn-primary' onClick={() => this.resetCounter()}>
          Reset
        </button>
      </div>
    );
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1,
    });
  }

  resetCounter() {
    this.setState({
      currentCount: 0,
    });
  }
}
