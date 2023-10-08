import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface PopupState {
  isOpen: boolean,
  editText: string
}

const initialState: PopupState = {
  isOpen: false,
  editText: ''
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
    setEditText: (state, action) => {
      state.editText = action.payload;
    },
  },
});

export const { setPopupOpen, setPopupClose, setEditText } = popupSlice.actions;
export const selectOpen = (state: RootState) => state.popupSlice.isOpen;
export const selectEditText = (state: RootState) => state.popupSlice.editText;

export default popupSlice.reducer;
