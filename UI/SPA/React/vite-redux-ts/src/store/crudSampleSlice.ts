import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CrudSampleSliceState {
  message: string;
}

const initialState: CrudSampleSliceState = {
  message: '',
}

const crudSampleSlice = createSlice({
  name: 'crudSample',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = '';
    },
  },
})

export const { setMessage, clearMessage } = crudSampleSlice.actions
export default crudSampleSlice.reducer