import { Plus, Check } from '../../../../assets/icons';
import s from './Header.module.scss';
import { WorkspaceCard } from '../WorkspaceCard';
import { RootState } from '../../../../store/store';
import {
  deleteWorkspace,
  editWorkspace,
  newWorkspace,
  updateWorkspaceName,
  setWorkspaces,
  workspacesSelector,
} from '../../../../store/slices/workspacesSlice';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { Board, Workspace } from '../../../../store/store.types';
import clsx from 'clsx';
import {
  activeWorkspaceSelector,
  setActiveWorkspace,
} from '../../../../store/slices';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export const Header = () => {
  const dispatch = useDispatch();

  const workspaces = useSelector<RootState, Workspace[]>(workspacesSelector);

  const activeWorkspace = useSelector<RootState, Board['activeWorkspace']>(
    activeWorkspaceSelector
  );

  // Edit Workspace
  const editedWorkspace = workspaces.find(
    (workspace) => workspace.edited === true
  );
  const [editing, setEditing] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');

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
        setWorkspaceName('');
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

  const handleWorkspaceClick = (id: string) => {
    dispatch(setActiveWorkspace(id));
  };

  // DND
  const [list, setList] = useState(workspaces);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over!.id) {
      setList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over!.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    if (editedWorkspace) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, [editedWorkspace]);

  // Sync with store
  useEffect(() => {
    dispatch(setWorkspaces(list));
  }, [dispatch, list]);

  // Sync store with local state
  useEffect(() => {
    setList(workspaces);
  }, [workspaces]);

  // Prevent disabled save button
  useEffect(() => {
    if (editedWorkspace) {
      setWorkspaceName(editedWorkspace.name);
    }
  }, [editedWorkspace]);

  useEffect(() => {
    if (workspaces.length === 0) {
      dispatch(setActiveWorkspace(''));
    }
  }, [dispatch, workspaces]);

  return (
    <div className={s.wrapper}>
      {/* List of available workspaces */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={list} strategy={verticalListSortingStrategy}>
          {list.map(({ id, name, edited, disabled }) => (
            <WorkspaceCard
              key={id}
              active={id === activeWorkspace}
              id={id}
              name={name}
              edited={edited}
              disabled={disabled}
              onClick={() => handleWorkspaceClick(id)}
              onInput={handleInputChange}
              onDelete={() => handleDeleteWorkspace(id)}
              onEdit={() => handleEditClick(id)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        className={clsx(s.createBtn, {
          [s.editing]: editing,
          [s.ready]:
            editing &&
            workspaceName.length > 0 &&
            workspaceName !== editedWorkspace?.name,
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
