import { configureStore } from '@reduxjs/toolkit';
import { boardSlice, workspacesSlice, groupsSlice, cardsSlice } from './slices';

import { localStorageMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    workspaces: workspacesSlice.reducer,
    board: boardSlice.reducer,
    groups: groupsSlice.reducer,
    cards: cardsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    localStorageMiddleware.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
