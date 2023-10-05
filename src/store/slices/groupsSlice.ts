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
    ) => {
      const { workspaceId, groupId } = action.payload;
      const groups = state[workspaceId];
      const filteredGroup = groups.filter((group) => group.id !== groupId);
      state[workspaceId] = filteredGroup;
    },

    addCard: (
      state,
      action: PayloadAction<{
        workspaceId: string;
        groupId: string;
      }>
    ) => {
      const { workspaceId, groupId } = action.payload;
      const group = state[workspaceId].find((group) => group.id === groupId);
      void group?.cards?.push({ id: nanoid(), name: '', subCards: [] });
    },

    deleteCard: (
      state,
      action: PayloadAction<{
        workspaceId: string;
        groupId: string;
        id: string;
      }>
    ) => {
      const { workspaceId, groupId, id } = action.payload;
      const group = state[workspaceId].find((group) => group.id === groupId);
      if (group && group.cards) {
        group.cards = group?.cards?.filter((card) => card.id !== id);
      }
    },

    editCardName: (
      state,
      action: PayloadAction<{
        workspaceId: string;
        groupId: string;
        id: string;
        name: string;
      }>
    ) => {
      const { workspaceId, groupId, id, name } = action.payload;
      const group = state[workspaceId].find((group) => group.id === groupId);
      const card = group?.cards?.find((card) => card.id === id);
      if (card) {
        card.name = name;
      }
    },
  },
});

export const {
  createGroup,
  deleteGroup,
  editGroupName,
  addCard,
  deleteCard,
  editCardName,
} = groupsSlice.actions;
