import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import type { TypedStartListening } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import {
  deleteWorkspace,
  editWorkspace,
  newWorkspace,
  updateWorkspaceName,
} from '../slices/workspacesSlice';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const localStorageMiddleware = createListenerMiddleware();
import { WORKSPACES_KEY } from '../../config';

localStorageMiddleware.startListening as AppStartListening;
localStorageMiddleware.startListening({
  matcher: isAnyOf(
    newWorkspace,
    updateWorkspaceName,
    deleteWorkspace,
    editWorkspace
  ),
  effect: async (_, { getState }) => {
    const { workspaces } = getState() as RootState;

    localStorage.setItem(WORKSPACES_KEY, JSON.stringify(workspaces));
  },
}) as unknown as AppStartListening;
