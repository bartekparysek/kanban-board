import { FC } from 'react';
import s from './HoverMenu.module.scss';
import { HoverMenuProps } from '.';
import { Delete, Edit } from '../../assets/icons';
import clsx from 'clsx';

export const HoverMenu: FC<HoverMenuProps> = ({
  className,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <div className={clsx(className, s.options)}>
      <button onClick={onEditClick}>
        <Edit />
      </button>
      <button onClick={onDeleteClick}>
        <Delete />
      </button>
    </div>
  );
};
