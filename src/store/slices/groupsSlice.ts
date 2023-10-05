import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { Groups } from '../store.types';
import { GROUPS_KEY } from '../../config';

// get data from local storage
const initialState: Groups = JSON.parse(
  localStorage.getItem(GROUPS_KEY) ?? '{}'
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    createGroup: (
      state,
      action: PayloadAction<{ workspaceId: string; name: string }>
    ) => {
      const { workspaceId, name } = action.payload;

      const group = { id: nanoid(), name: name, cards: [] };

      if (state[workspaceId]) {
        void state[workspaceId].push(group);
      } else {
        return {
          [workspaceId]: [...[group]],
        };
      }
    },

    editGroupName: (
      state,
      action: PayloadAction<{
        workspaceId: string;
        groupId: string;
        name: string;
      }>
    ) => {
      const { workspaceId, groupId, name } = action.payload;
      const group = state[workspaceId].find((group) => group.id === groupId);
      if (group) {
        group.name = name;
      }
    },

    deleteGroup: (
      state,
      action: PayloadAction<{
        workspaceId: string;
        groupId: string;
      }>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): any => {
      const { workspaceId, groupId } = action.payload;
      const groups = state[workspaceId];
      const filteredGroup = groups.filter((group) => group.id !== groupId);
      state[workspaceId] = filteredGroup;
    },
  },
});

export const { createGroup, deleteGroup, editGroupName } = groupsSlice.actions;
