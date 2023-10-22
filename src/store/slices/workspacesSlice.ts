import {
  PayloadAction,
  createSlice,
  nanoid,
  createSelector,
} from '@reduxjs/toolkit';
import { Workspace } from '../store.types';
import { WORKSPACES_KEY } from '../../config';
import { RootState } from '../store';

const initialState: Workspace[] = JSON.parse(
  localStorage.getItem(WORKSPACES_KEY) ?? '[]'
);

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    newWorkspace: (state) => {
      state.push({ id: nanoid(), name: '', edited: true });
    },

    deleteWorkspace: (state, action: PayloadAction<string>) => {
      return state.filter((workspace) => workspace.id !== action.payload);
    },

    editWorkspace: (state, action: PayloadAction<string>) => {
      return state.map((workspace) =>
        workspace.id === action.payload
          ? { ...workspace, edited: true }
          : { ...workspace, disabled: true }
      );
    },

    updateWorkspaceName: (
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) => {
      return state.map((workspace) =>
        workspace.id === action.payload.id
          ? { ...workspace, name: action.payload.name, edited: false }
          : { ...workspace, disabled: false }
      );
    },
    setWorkspaces: (_state, action: PayloadAction<Workspace[]>) => {
      return action.payload;
    },
  },
});

export const {
  newWorkspace,
  updateWorkspaceName,
  deleteWorkspace,
  editWorkspace,
  setWorkspaces,
} = workspacesSlice.actions;

const workspaces = (state: RootState) => state.workspaces;

export const workspacesSelector = createSelector(
  [workspaces],
  (workspaces) => workspaces
);

export const editedWorkspaceSelector = createSelector(
  [workspaces],
  (workspaces) => workspaces.find((workspace) => workspace.edited === true)
);
