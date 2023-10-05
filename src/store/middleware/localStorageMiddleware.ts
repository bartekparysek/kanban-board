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
import { BOARD_KEY, GROUPS_KEY, WORKSPACES_KEY } from '../../config';
import { setActiveWorkspace } from '../slices/boardSlice';
import {
  createGroup,
  deleteGroup,
  editGroupName,
  addCard,
  deleteCard,
  editCardName,
} from '../slices/groupsSlice';

localStorageMiddleware.startListening as AppStartListening;
localStorageMiddleware.startListening({
  matcher: isAnyOf(
    newWorkspace,
    updateWorkspaceName,
    deleteWorkspace,
    editWorkspace
  ),
  effect: (_, { getState }) => {
    const { workspaces } = getState() as RootState;

    localStorage.setItem(WORKSPACES_KEY, JSON.stringify(workspaces));
  },
}) as unknown as AppStartListening;

localStorageMiddleware.startListening({
  actionCreator: setActiveWorkspace,
  effect: (_, { getState }) => {
    const { board } = getState() as RootState;

    localStorage.setItem(BOARD_KEY, JSON.stringify(board));
  },
}) as unknown as AppStartListening;

localStorageMiddleware.startListening({
  matcher: isAnyOf(
    createGroup,
    deleteGroup,
    editGroupName,
    addCard,
    editCardName,
    deleteCard
  ),
  effect: (_, { getState }) => {
    const { groups } = getState() as RootState;

    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  },
}) as unknown as AppStartListening;
