import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import type { TypedStartListening } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import {
  deleteWorkspace,
  editWorkspace,
  newWorkspace,
  updateWorkspaceName,
  setWorkspaces,
  createGroup,
  deleteGroup,
  editGroupName,
  setGroup,
  createCard,
  deleteCard,
  editCardName,
  setCardsStore,
} from '../slices';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const localStorageMiddleware = createListenerMiddleware();
import { BOARD_KEY, CARDS_KEY, GROUPS_KEY, WORKSPACES_KEY } from '../../config';
import { setActiveWorkspace } from '../slices/boardSlice';

localStorageMiddleware.startListening as AppStartListening;
localStorageMiddleware.startListening({
  matcher: isAnyOf(
    newWorkspace,
    updateWorkspaceName,
    deleteWorkspace,
    editWorkspace,
    setWorkspaces
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
  matcher: isAnyOf(createGroup, deleteGroup, editGroupName, setGroup),
  effect: (_, { getState }) => {
    const { groups } = getState() as RootState;

    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  },
}) as unknown as AppStartListening;

localStorageMiddleware.startListening({
  matcher: isAnyOf(createCard, deleteCard, editCardName, setCardsStore),
  effect: (_, { getState }) => {
    const { cards } = getState() as RootState;

    localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
  },
}) as unknown as AppStartListening;
