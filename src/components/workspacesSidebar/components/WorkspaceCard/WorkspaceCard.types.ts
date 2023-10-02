export type WorkspaceCardProps = {
  edited?: boolean;
  name?: string;
  disabled?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onInput?: (value: string) => void;
  onEdit?: () => void;
};
