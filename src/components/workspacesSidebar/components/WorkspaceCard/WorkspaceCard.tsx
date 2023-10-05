import { ChangeEvent, FC, useEffect, useState } from 'react';
import { WorkspaceCardProps } from './WorkspaceCard.types';
import s from './WorkspaceCard.module.scss';
import { Edit, Delete } from '../../../../assets/icons';
import clsx from 'clsx';

export const WorkspaceCard: FC<WorkspaceCardProps> = ({
  edited = false,
  name,
  disabled,
  active,
  onClick,
  onDelete,
  onEdit,
  onInput,
}) => {
  const [editing, setEditing] = useState(edited);
  const [showOptions, setShowOptions] = useState(true);

  const shortcut = name?.[0];

  const handleMouseOver = () => {
    if (!editing && active) {
      setShowOptions(true);
    }
  };

  const handleMouseLeave = () => {
    if (!editing) {
      setShowOptions(false);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
    onEdit?.();
  };

  const handleDeleteClick = () => {
    onDelete?.();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (editing && !disabled) {
      onInput?.(value);
    }
  };

  useEffect(() => {
    setEditing(edited);
  }, [edited]);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={clsx(s.wrapper, {
        [s.active]: active,
      })}
    >
      <div className={s.placeholder}>{shortcut && <span>{shortcut}</span>}</div>

      {name && !editing && <span className={s.name}>{name}</span>}
      {showOptions && !editing && (
        <div className={s.options}>
          <div onClick={handleEditClick}>
            <Edit />
          </div>
          <div onClick={handleDeleteClick}>
            <Delete />
          </div>
        </div>
      )}
      {editing && (
        <input
          placeholder="Workspace name"
          type="text"
          className={s.input}
          onChange={handleInputChange}
          defaultValue={name || undefined}
          autoFocus
        />
      )}
    </button>
  );
};
