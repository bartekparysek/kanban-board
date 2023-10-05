import { Card } from '../../../../store/store.types';
export type CardProps = Card & {
  edited?: boolean;
  groupId: string;
  workspaceId?: string;
  handleHover: () => void;
};
