import { useSelector } from 'react-redux'
import type { RootState } from '../store'

export default function About() {
  // Reduxのstoreから値を取得
  const count = useSelector((state: RootState) => state.counter.value)
  const message = useSelector((state: RootState) => state.crudSample.message)
  
  return <div>
    <h1>About</h1>
    <p>About Pageです。</p>
    {/* countを表示 */}
    <p>現在のカウント: {count}</p>
    {/* messageを表示 */}
    <p>現在のメッセージ: {message}</p>
  </div>  
}