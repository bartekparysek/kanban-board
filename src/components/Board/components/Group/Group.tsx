import { ChangeEvent, FC, useState, KeyboardEvent, MouseEvent } from 'react';
import { GroupProps } from './Group.types';
import s from './Group.module.scss';
import { Plus } from '../../../../assets/icons';
import { HoverMenu } from '../../../HoverMenu';
import { useDispatch } from 'react-redux';
import {
  createCard,
  deleteGroup,
  editGroupName,
} from '../../../../store/slices';
import { Card } from '../Card';
import { CSS } from '@dnd-kit/utilities';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DragHandle } from '../../../../assets/icons';

export const Group: FC<GroupProps> = ({ id, name, cards, workspaceId }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        type: 'Group',
        group: { id, name, cards, workspaceId },
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMouseOver = (e: MouseEvent) => {
    e.stopPropagation();
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const handleDeleteGroup = () => {
    if (workspaceId) {
      dispatch(deleteGroup({ groupId: id, workspaceId }));
    }
  };

  const handleEditGroupName = () => {
    setEditing(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (editing) {
      setNewName(value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && name.length > 0 && workspaceId) {
      dispatch(
        editGroupName({ workspaceId: workspaceId, groupId: id, name: newName })
      );
      setEditing(false);
    }
    if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  const handleAddCard = () => {
    if (workspaceId) {
      dispatch(createCard({ groupId: id, name: '' }));
    }
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div className={s.wrapper}>
        <div
          className={s.header}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {!editing && <p className={s.name}>{name}</p>}
          {editing && (
            <input
              placeholder="Group name"
              type="text"
              className={s.input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              defaultValue={name || undefined}
              autoFocus
            />
          )}
          {showOptions && (
            <HoverMenu
              onDeleteClick={handleDeleteGroup}
              onEditClick={handleEditGroupName}
              className={s.options}
            />
          )}
          <div {...listeners} {...attributes} className={s.dragHandle}>
            <DragHandle />
          </div>
        </div>
        <SortableContext
          items={cards || []}
          strategy={verticalListSortingStrategy}
        >
          {cards && cards?.length > 0 && (
            <ul className={s.list}>
              {cards.map((card) => (
                <li key={card.id}>
                  <Card {...card} workspaceId={workspaceId} />
                </li>
              ))}
            </ul>
          )}
        </SortableContext>
        <button className={s.addBtn} onClick={handleAddCard}>
          <Plus />
          Add a card
        </button>
      </div>
    </li>
  );
};
