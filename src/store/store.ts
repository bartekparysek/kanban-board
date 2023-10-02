import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices';
import { workspacesSlice } from './slices/workspacesSlice';
import { localStorageMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    workspaces: workspacesSlice.reducer,
    board: boardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    localStorageMiddleware.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
