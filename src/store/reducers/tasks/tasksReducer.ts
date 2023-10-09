import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { TaskInterface, Columns } from '../../../components/Kanban/Kanban';

interface initialStateInterface {
  columns: Columns
}

export const initialState: initialStateInterface = {
  columns: [
  {
      name: 'first',
      title: 'План',
      items: [],
  },
  {
      name: 'second',
      title: 'В работе',
      items: [],
  },
  {
      name: 'third',
      title: 'В тестировании',
      items: [],
  },
  {
      name: 'fourth',
      title: 'Выполнено',
      items: [],
  },
]}

export const tasksSlice = createSlice({
  name: 'tasksData',
  initialState,
  reducers: {
    addTaskAfterMoved: (state: initialStateInterface, action: PayloadAction<Columns>) => {
      state.columns = action.payload;
    },    
    addTask: (state: initialStateInterface, action: PayloadAction<TaskInterface>) => {
      const col = state.columns.find(item => item.name === action.payload.col);
      if (col) {
        col.items = [...col.items, action.payload];
      }
    },
    deleteTask: (state: initialStateInterface, action: PayloadAction<TaskInterface>) => {
      const col = state.columns.find(item => item.name === action.payload.col);
      if (col) {
        col.items = col.items.filter((item) => {
          return item.id !== action.payload.id
        });      
      }
    },
  },
});

export const { addTask, deleteTask, addTaskAfterMoved } = tasksSlice.actions;
export const selectAllTasks = (state: RootState) => state.tasksSlice.columns;

export default tasksSlice.reducer;
