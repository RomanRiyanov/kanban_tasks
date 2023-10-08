import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { TaskInterface, Columns } from '../../../components/Kanban/Kanban';


// export interface TasksState {
//   isOpen: boolean,
// }

// const initialState: TasksState = {
//   isOpen: false,
// };

// export interface TaskInterface {
//   text: string;
//   id: string;
// }

// export interface ColumnIntarface {
//   name: string;
//   title: string;
//   items: TaskInterface[] | [];
// }

// type Columns = ColumnIntarface[];

const initialState: Columns = [
  {
      name: 'first',
      title: 'План',
      items: [
          // {
          //     text: 'Задача 1',
          //     id: 'qwerty234567'
          // }, 
          // {
          //     text: 'Задача123Задача123З адача123Задача123vv Задача123vЗадач а123Задача12 3Задача123',
          //     id: 'rtyuiop4567'
          // },         
      ],
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
];

interface MovingTask {
  oldColumn: string;
  newColumn: string;
  newTask: TaskInterface
}

export const tasksSlice = createSlice({
  name: 'tasksData',
  initialState,
  reducers: {
    addTaskAfterMoved: (state: Columns, action: PayloadAction<MovingTask>) => {
      console.log('redux сработал')

      const col = state.find(item => item.name === action.payload.oldColumn);
      if (col) {
        col.items = col.items.filter((item) => {
          return item.id !== action.payload.newTask.id
        });
      }
      
      state.find(item => item.name === action.payload.newColumn)?.
      items.push(action.payload.newTask);

      // state.columns = action.payload;

      // state = state.filter((col) => {
      //   col.items = col.items.filter((oldTask) => {
      //     if (oldTask.id === action.payload.id) {
      //       return action.payload;
      //     } else return oldTask;
      //   })
      // })
    },    
    addTask: (state: Columns, action: PayloadAction<TaskInterface>) => {
      state.find(item => item.name === action.payload.col)?.
      items.push(action.payload);
    },
    deleteTask: (state: Columns, action: PayloadAction<TaskInterface>) => {
      // console.log('action.payload',action.payload)
      const col = state.find(item => item.name === action.payload.col);
      if (col) {
      // state.forEach((col) => {
        col.items = col.items.filter((item) => {
          return item.id !== action.payload.id
        });      
      }
    },
    editTask: (state: Columns, action: PayloadAction<TaskInterface>) => {
      // console.log('action.payload',action.payload)
      const col = state.find(item => item.name === action.payload.col);
      if (col) {
      // state.forEach((col) => {
        col.items = col.items.filter((item) => {
          return item.id !== action.payload.id
        });      
      }
    },
  },
});

export const { addTask, deleteTask, addTaskAfterMoved, editTask } = tasksSlice.actions;
export const selectAllTasks = (state: RootState) => state.tasksSlice;

export default tasksSlice.reducer;
