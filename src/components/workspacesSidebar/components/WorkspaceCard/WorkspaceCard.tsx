import { ChangeEvent, FC, useEffect, useState } from 'react';
import { WorkspaceCardProps } from './WorkspaceCard.types';
import s from './WorkspaceCard.module.scss';
import clsx from 'clsx';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { DragHandle } from '../../../../assets/icons/DragHandle';
import { HoverMenu } from '../../../HoverMenu';

export const WorkspaceCard: FC<WorkspaceCardProps> = ({
  edited = false,
  name,
  id,
  disabled,
  active,
  onClick,
  onDelete,
  onEdit,
  onInput,
}) => {
  const [editing, setEditing] = useState(edited);
  const [showOptions, setShowOptions] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  const handleClick = () => {
    onClick?.();
    setShowOptions(true);
  };

  useEffect(() => {
    setEditing(edited);
  }, [edited]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={clsx(s.wrapper, {
        [s.active]: active,
        [s.disabled]: disabled,
      })}
    >
      <div className={s.placeholder}>{shortcut && <span>{shortcut}</span>}</div>

      {name && !editing && <span className={s.name}>{name}</span>}
      {showOptions && !editing && (
        <HoverMenu
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
          className={s.options}
        />
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

      <div {...listeners} {...attributes} className={s.dragHandle}>
        <DragHandle />
      </div>
    </div>
  );
};
