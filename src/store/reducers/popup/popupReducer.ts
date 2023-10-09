import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { TaskInterface } from '../../../components/Kanban/Kanban';

export interface PopupState {
  isOpen: boolean,
  editText: string,
  isDeletePopupOpen: boolean,
  taskToDeletePopup: TaskInterface | null;
}

const initialState: PopupState = {
  isOpen: false,
  editText: '',
  isDeletePopupOpen: false,
  taskToDeletePopup: null
};

export const popupSlice = createSlice({
  name: 'popupData',
  initialState,
  reducers: {
    setPopupOpen: (state) => {
      state.isOpen = true;
    },
    setPopupClose: (state) => {
      state.isOpen = false;
    },
    setDeletePopupOpen: (state) => {
      state.isDeletePopupOpen = true;
    },
    setDeletePopupClose: (state) => {
      state.isDeletePopupOpen = false;
    },
    setEditText: (state, action) => {
      state.editText = action.payload;
    },
    setTaskToDeletePopup: (state, action) => {
      state.taskToDeletePopup = action.payload;
    },
  },
});

export const { 
  setPopupOpen, 
  setPopupClose,
  setEditText, 
  setDeletePopupClose, 
  setDeletePopupOpen,
  setTaskToDeletePopup
} = popupSlice.actions;
export const selectOpen = (state: RootState) => state.popupSlice.isOpen;
export const selectEditText = (state: RootState) => state.popupSlice.editText;
export const selectDeletePopupIsOpen = (state: RootState) => state.popupSlice.isDeletePopupOpen;
export const selectTaskToDeletePopup = (state: RootState) => state.popupSlice.taskToDeletePopup;

export default popupSlice.reducer;
