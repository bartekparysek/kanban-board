import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { Workspace } from '../store.types';
import { WORKSPACES_KEY } from '../../config';

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
    setWorkspaces: (state, action: PayloadAction<Workspace[]>) => {
      return (state = action.payload);
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
