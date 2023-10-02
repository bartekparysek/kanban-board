import { createSlice } from '@reduxjs/toolkit';
import { Board } from '../store.types';

// get data from local storage
const initialState: Board | Record<string, never> = {};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

export const {} = boardSlice.actions;
