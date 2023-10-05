import { useState, FC, ChangeEvent, KeyboardEvent } from 'react';
import { CardProps } from './Card.types';
import s from './Card.module.scss';

export const Card: FC<CardProps> = ({ name }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (editing) {
      setValue(value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && name.length > 0) {
      // dispatch(createGroup({ workspaceId: workspace, name }));
      setEditing(false);
    }
    if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  return (
    <div className={s.wrapper}>
      {editing && (
        <input
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      )}
      {!editing && name && <>{name}</>}
    </div>
  );
};
