import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import crudSampleReducer from './crudSampleSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    crudSample: crudSampleReducer,
  },
})

// 型エクスポート（useSelector / useDispatch で使用）
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch