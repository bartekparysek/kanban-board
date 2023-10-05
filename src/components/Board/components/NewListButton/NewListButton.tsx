import s from './NewListButton.module.scss';
import { Plus } from '../../../../assets/icons';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { NewListButtonProps } from './NewListButton.types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../../../store/slices';

export const NewListButton: FC<NewListButtonProps> = ({ workspace }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (editing) {
      setName(value);
    }
  };

  const handleClick = () => {
    setEditing(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && name.length > 0 && workspace) {
      dispatch(createGroup({ workspaceId: workspace, name }));
      setEditing(false);
    }
    if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  return (
    <button
      className={clsx(s.wrapper, {
        [s.edited]: editing,
      })}
      onClick={handleClick}
    >
      {!editing && (
        <>
          <Plus />
          Add another list
        </>
      )}
      {editing && (
        <input
          placeholder="Title of the new list..."
          type="text"
          className={s.input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}
    </button>
  );
};
