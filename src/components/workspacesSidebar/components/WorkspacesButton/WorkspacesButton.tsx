import clsx from 'clsx';
import { memo } from 'react';
import { Plus, Check } from '../../../../assets/icons';
import s from './WorkspacesButton.module.scss';
import { WorkspacesButtonProps } from '.';

export const WorkspacesButton = memo<WorkspacesButtonProps>(
  ({ editing, ready, onClick, isNewWorkspace }) => {
    return (
      <button
        className={clsx(s.createBtn, {
          [s.editing]: editing,
          [s.ready]: ready,
        })}
        type="button"
        onClick={onClick}
      >
        {!editing ? (
          <>
            <Plus />
            Create Workspace
          </>
        ) : (
          <>
            <Check />
            {isNewWorkspace ? 'Save new workspace' : 'Save workspace'}
          </>
        )}
      </button>
    );
  }
);
