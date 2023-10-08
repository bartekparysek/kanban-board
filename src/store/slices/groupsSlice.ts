import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { Group, Groups } from '../store.types';
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
    ) => {
      const { workspaceId, groupId } = action.payload;
      const groups = state[workspaceId];
      const filteredGroup = groups.filter((group) => group.id !== groupId);
      state[workspaceId] = filteredGroup;
    },

    setGroup: (
      state,
      action: PayloadAction<{
        workspaceId: string;
        groups: Group[];
      }>
    ) => {
      const { workspaceId, groups } = action.payload;

      void (state[workspaceId] = groups);
    },
  },
});

export const { createGroup, deleteGroup, editGroupName, setGroup } =
  groupsSlice.actions;
