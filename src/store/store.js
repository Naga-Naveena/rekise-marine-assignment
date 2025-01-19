import { configureStore } from '@reduxjs/toolkit';
import tableDataReducer from './slice';

const store = configureStore({
  reducer: {
    counter: tableDataReducer,
  },
});

export default store;
