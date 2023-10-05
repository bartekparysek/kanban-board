import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board } from '../store.types';
import { BOARD_KEY } from '../../config';

// get data from local storage
const initialState: Board = JSON.parse(localStorage.getItem(BOARD_KEY) ?? '{}');

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setActiveWorkspace: (state, action: PayloadAction<string>) => {
      state.activeWorkspace = action.payload;
    },
  },
});

export const { setActiveWorkspace } = boardSlice.actions;
