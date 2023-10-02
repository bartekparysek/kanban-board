import { Plus, Check } from '../../../../assets/icons';
import s from './Header.module.scss';
import { WorkspaceCard } from '../WorkspaceCard';
import { RootState } from '../../../../store/store';
import {
  deleteWorkspace,
  editWorkspace,
  newWorkspace,
  updateWorkspaceName,
} from '../../../../store/slices/workspacesSlice';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { Workspace } from '../../../../store/store.types';
import clsx from 'clsx';

export const Header = () => {
  const [editing, setEditing] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const dispatch = useDispatch();
  const workspaces = useSelector<RootState, Workspace[]>(
    (state) => state.workspaces
  );

  const editedWorkspace = workspaces.find(
    (workspace) => workspace.edited === true
  );

  const newWorkspaceCreated = Boolean(
    workspaces.find((workspace) => workspace.name === '' && workspace.edited)
  );

  const handleCreateWorkspace = () => {
    dispatch(newWorkspace());
    setEditing(true);
  };

  const handleButtonClick = () => {
    if (!editing) {
      handleCreateWorkspace();
    } else {
      if (workspaceName.length > 0 && editedWorkspace) {
        dispatch(
          updateWorkspaceName({ id: editedWorkspace?.id, name: workspaceName })
        );
        setEditing(false);
      }
    }
  };

  const handleDeleteWorkspace = (id: string) => {
    dispatch(deleteWorkspace(id));
  };

  const handleInputChange = (value: string) => {
    setWorkspaceName(value);
  };

  const handleEditClick = (id: string) => {
    dispatch(editWorkspace(id));
  };

  useEffect(() => {
    if (editedWorkspace) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, [editedWorkspace]);

  return (
    <div className={s.wrapper}>
      {/* List of available workspaces */}
      <ul className={s.workspacesList}>
        {workspaces.map(({ id, name, edited, disabled }) => (
          <li key={id}>
            <WorkspaceCard
              name={name}
              edited={edited}
              disabled={disabled}
              onInput={handleInputChange}
              onDelete={() => handleDeleteWorkspace(id)}
              onEdit={() => handleEditClick(id)}
            />
          </li>
        ))}
      </ul>
      <button
        className={clsx(s.createBtn, {
          [s.editing]: editing,
        })}
        type="button"
        onClick={handleButtonClick}
      >
        {!editing ? (
          <>
            <Plus />
            Create Workspace
          </>
        ) : (
          <>
            <Check />
            {newWorkspaceCreated ? 'Save new workspace' : 'Save workspace'}
          </>
        )}
      </button>
    </div>
  );
};
