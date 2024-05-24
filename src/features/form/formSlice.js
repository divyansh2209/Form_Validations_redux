import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './formAPI';

const initialState = {
  value: 0,
  status: 'idle',
  formData: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  }
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    updateFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment , updateFormData  } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectFormData = (state) => state.counter.formData;


export default counterSlice.reducer;
