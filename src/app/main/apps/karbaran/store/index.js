import { combineReducers } from '@reduxjs/toolkit';
import karbarSlice from './karbarSlice';
import karbaranSlice from './karbaranSlice';

const reducer = combineReducers({
  karbarSlice,
  karbaranSlice,
});

export default reducer;
