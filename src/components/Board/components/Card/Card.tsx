import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  forwardRef,
} from 'react';
import { CardProps } from './Card.types';
import s from './Card.module.scss';
import { deleteCard, editCardName } from '../../../../store/slices';
import { useDispatch } from 'react-redux';
import { HoverMenu } from '../../../HoverMenu';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ name, groupId, id, workspaceId }, ref) => {
    const [editing, setEditing] = useState(name.length === 0);
    const [showOptions, setShowOptions] = useState(false);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const handleMouseOver = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!editing) {
        setShowOptions(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setShowOptions(false);
    };

    const handleDeleteCard = () => {
      if (workspaceId) {
        dispatch(deleteCard({ groupId, workspaceId, id }));
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
      if (e.key === 'Enter' && value.length > 0 && workspaceId) {
        dispatch(editCardName({ workspaceId, id, groupId, name: value }));
        setEditing(false);
      }
      if (e.key === 'Escape') {
        setEditing(false);
      }
    };

    return (
      <div
        ref={ref}
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
      </div>
    );
  }
);
