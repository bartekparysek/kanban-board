export type Board = {
  activeWorkspace?: string;
  groups?: [];
};

export type Group = {
  id: string;
  name: string;
  cards?: Card[];
};

export type Groups = {
  [key: string]: Group[];
};

export type Card = {
  id: string;
  name: string;
  subCards: Omit<Card, 'subCards'>[];
};

export type Workspace = {
  id: string;
  name: string;
  edited?: boolean;
  disabled?: boolean;
};
