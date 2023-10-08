import { Card, Group } from '../../../../store/store.types';

export type GroupProps = Group & { workspaceId?: string; cards?: Card[] };
