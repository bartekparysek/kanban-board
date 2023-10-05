export type WorkspaceCardProps = {
  edited?: boolean;
  name?: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onInput?: (value: string) => void;
  onEdit?: () => void;
};
