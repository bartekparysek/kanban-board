export type Board = {
  groups: [];
};

export type Group = {
  name: string;
  cards: Card[];
};

export type Card = {
  name: string;
  subCards: Omit<Card, 'subCards'>[];
};

export type Workspace = {
  id: string;
  name: string;
  edited?: boolean;
  disabled?: boolean;
};
