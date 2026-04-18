import * as React from 'react';

// Redux 関連のインポート
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { increment, reset } from '../store/counterSlice';

// --- 既存コード

// Propsの型定義
type CounterProps //= {};
= {
  currentCount: number;
  onIncrement: () => void;
  onReset: () => void;
};

// Stateの型定義
type CounterState = {
  currentCount: number;
};

// 以下、Redux修正あり
// クラス名称を変更
export class Counter_org extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = { currentCount: 0 };
  }

  // Reduxのdispatchを呼び出す形に変更
  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>This is a simple example of a React component.</p>
        <p>Current count: <strong>{this.props.currentCount}</strong></p>
        <button className='btn-primary' onClick={() => this.props.onIncrement()}>
          Increment
        </button>
        <button className='btn-primary' onClick={() => this.props.onReset()}>
          Reset
        </button>
      </div>
    );
  }

  /*incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1,
    });
  }*/
}

// --- Reduxラッパー ---
export const Counter = () => {
  const currentCount = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  // dispatch の戻り値を void に吸収させる
  const handleIncrement = (): void => { dispatch(increment()); };
  const handleReset = (): void => { dispatch(reset()); };

  return (
    <Counter_org
      currentCount={currentCount}
      onIncrement={handleIncrement}
      onReset={handleReset}
    />
  );
};