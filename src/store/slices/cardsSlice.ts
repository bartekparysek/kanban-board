import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { Card } from '../store.types';
import { CARDS_KEY } from '../../config';

// get data from local storage
const initialState: Card[] = JSON.parse(
  localStorage.getItem(CARDS_KEY) ?? '[]'
);

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    createCard: (
      state,
      action: PayloadAction<{ groupId: string; name: string }>
    ) => {
      const { groupId, name } = action.payload;
      const card = { id: nanoid(), groupId, name: name, subCards: [] };

      state.push(card);
    },

    editCardName: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
      }>
    ) => {
      const { id, name } = action.payload;
      const card = state.find((card) => card.id === id);
      if (card) {
        card.name = name;
      }
    },

    deleteCard: (state, action: PayloadAction<string>) => {
      return state.filter((card) => card.id !== action.payload);
    },

    setCardsStore: (state, action: PayloadAction<Card[]>) => {
      return (state = action.payload);
    },
  },
});

export const { createCard, setCardsStore, deleteCard, editCardName } =
  cardsSlice.actions;
