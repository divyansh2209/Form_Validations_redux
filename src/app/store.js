import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/form/formSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
