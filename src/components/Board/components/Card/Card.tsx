import { useState, ChangeEvent, KeyboardEvent, MouseEvent, FC } from 'react';
import { CardProps } from './Card.types';
import s from './Card.module.scss';
import { deleteCard, editCardName } from '../../../../store/slices';
import { useDispatch } from 'react-redux';
import { HoverMenu } from '../../../HoverMenu';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandle } from '../../../../assets/icons';

export const Card: FC<CardProps> = ({ name, groupId, id }) => {
  const [editing, setEditing] = useState(name.length === 0);
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        type: 'Card',
        card: { id, name, groupId },
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMouseOver = (e: MouseEvent) => {
    e.stopPropagation();
    if (!editing) {
      setShowOptions(true);
    }
  };

  const handleMouseLeave = (e: MouseEvent) => {
    e.stopPropagation();
    setShowOptions(false);
  };

  const handleDeleteCard = () => {
    if (workspaceId) {
      dispatch(deleteCard(id));
    }
  };

  const handleEditCardName = () => {
    setEditing(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (editing) {
      setValue(value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.length > 0) {
      dispatch(editCardName({ id, name: value }));
      setEditing(false);
    }
    if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={s.wrapper}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {editing && (
        <input
          className={s.input}
          placeholder="Title of the new card..."
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}
      {!editing && name && <span className={s.name}>{name}</span>}
      {showOptions && (
        <HoverMenu
          className={s.options}
          onEditClick={handleEditCardName}
          onDeleteClick={handleDeleteCard}
        />
      )}
      <div {...listeners} {...attributes} className={s.dragHandle}>
        <DragHandle />
      </div>
    </div>
  );
};
