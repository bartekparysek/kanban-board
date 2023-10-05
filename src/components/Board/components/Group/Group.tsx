import {
  ChangeEvent,
  FC,
  useState,
  KeyboardEvent,
  MouseEvent,
  useRef,
} from 'react';
import { GroupProps } from './Group.types';
import s from './Group.module.scss';
import { Plus } from '../../../../assets/icons';
import { HoverMenu } from '../../../HoverMenu';
import { useDispatch } from 'react-redux';
import { addCard, deleteGroup, editGroupName } from '../../../../store/slices';
import { Card } from '../Card';

export const Group: FC<GroupProps> = ({ id, name, cards, workspaceId }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const cardsListRef = useRef<HTMLDivElement[]>([]);

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
      dispatch(addCard({ workspaceId, groupId: id }));
    }
  };

  return (
    <div
      className={s.wrapper}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div className={s.header}>
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
      </div>

      {cards && cards?.length > 0 && (
        <ul>
          {cards.map((card, i) => (
            <li key={card.name}>
              <Card
                ref={(ref) => (cardsListRef.current[i] = ref!)}
                {...card}
                groupId={id}
                workspaceId={workspaceId}
                handleHover={handleMouseLeave}
              />
            </li>
          ))}
        </ul>
      )}
      <button className={s.addBtn} onClick={handleAddCard}>
        <Plus />
        Add a card
      </button>
    </div>
  );
};
