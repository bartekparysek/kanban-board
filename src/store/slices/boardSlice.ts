import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { Board } from '../store.types';
import { BOARD_KEY } from '../../config';
import { RootState } from '../store';

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

export const activeWorkspace = (state: RootState) =>
  state.board.activeWorkspace;

export const activeWorkspaceSelector = createSelector(
  [activeWorkspace],
  (activeWorkspace) => activeWorkspace
);
