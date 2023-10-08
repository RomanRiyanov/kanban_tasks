import { combineReducers } from '@reduxjs/toolkit';
import popupSlice from './popup/popupReducer';
import tasksSlice from './tasks/tasksReducer';

export default combineReducers({
  popupSlice,
  tasksSlice
});
