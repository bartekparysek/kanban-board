import s from './Board.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import type {
  Board as BoardType,
  Group as GroupType,
  Card as CardType,
} from '../../store/store.types';
import { NewListButton } from './components/NewListButton/NewListButton';
import { Group } from './components/Group/Group';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  setGroup,
  setCardsStore,
  activeGroupsSelector,
} from '../../store/slices';
import { Card } from './components/Card';
import { createPortal } from 'react-dom';

export const Board = () => {
  const dispatch = useDispatch();
  const activeWorkspace = useSelector<RootState, BoardType['activeWorkspace']>(
    (state) => state.board.activeWorkspace
  );

  const groupsState = useSelector<RootState, GroupType[] | undefined>(
    activeGroupsSelector
  );

  const cardsState = useSelector<RootState, CardType[] | undefined>(
    (state) => state.cards
  );

  // DND
  const [groups, setGroups] = useState(groupsState || []);
  const [cards, setCards] = useState(cardsState || []);
  const [activeGroup, setActiveGroup] = useState<GroupType | null>(null);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  // Sync with localStorage
  useEffect(() => {
    if (activeWorkspace && groups) {
      dispatch(setGroup({ workspaceId: activeWorkspace, groups: groups }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, groups]);

  useEffect(() => {
    if (cards) {
      dispatch(setCardsStore(cards));
    }
  }, [dispatch, cards]);

  // Sync with store
  useEffect(() => {
    setGroups(groupsState || []);
  }, [groupsState]);

  useEffect(() => {
    setCards(cardsState || []);
  }, [cardsState]);

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        <DndContext
          sensors={sensors}
          onDragStart={({ active }) => {
            if (active.data.current?.type === 'Group') {
              setActiveGroup(active.data.current.group);
              return;
            }

            if (active.data.current?.type === 'Card') {
              setActiveCard(active.data.current.card);
              return;
            }
          }}
          onDragOver={({ active, over }) => {
            if (!over) return;

            const activeId = active.id as string;
            const overId = over.id as string;

            if (activeId === overId) return;

            const isActiveACard = active.data.current?.type === 'Card';
            const isOverACard = over.data.current?.type === 'Card';

            if (!isActiveACard) return;
            // Dropping card over card in the same group
            if (isActiveACard && isOverACard) {
              setCards((cards) => {
                const activeIndex = cards.findIndex(
                  (card) => card.id === activeId
                );
                const overIndex = cards.findIndex((card) => card.id === overId);

                if (cards[activeIndex].groupId != cards[overIndex].groupId) {
                  const newCards = cards.map((card) =>
                    card.id === activeId
                      ? {
                          ...card,
                          groupId: cards[overIndex].groupId,
                        }
                      : card
                  );
                  return arrayMove(newCards, activeIndex, overIndex - 1);
                }

                return arrayMove(cards, activeIndex, overIndex);
              });
            }
            const isOverAGroup = over.data.current?.type === 'Group';

            // Dropping a Card over a Group
            if (isActiveACard && isOverAGroup) {
              setCards((cards) => {
                const activeIndex = cards.findIndex((t) => t.id === activeId);

                const newCards = cards.map((card) =>
                  card.id === activeId
                    ? {
                        ...card,
                        groupId: overId,
                      }
                    : card
                );

                return arrayMove(newCards, activeIndex, activeIndex);
              });
            }
          }}
          onDragEnd={({ active, over }) => {
            setActiveGroup(null);
            setActiveCard(null);
            if (
              active.id !== over!.id &&
              active.data?.current?.type === 'Group'
            ) {
              setGroups((items) => {
                const oldIndex = items.findIndex(
                  (item) => item.id === active.id
                );
                const newIndex = items.findIndex(
                  (item) => item.id === over!.id
                );

                return arrayMove(items, oldIndex, newIndex);
              });
            }
          }}
        >
          <SortableContext
            items={groups || []}
            strategy={horizontalListSortingStrategy}
          >
            {groups &&
              groups.length > 0 &&
              groups.map((props) => (
                <Group
                  key={props.id}
                  {...props}
                  workspaceId={activeWorkspace}
                  cards={cards.filter((card) => card.groupId === props.id)}
                />
              ))}
          </SortableContext>

          {createPortal(
            <DragOverlay>
              {activeGroup && (
                <Group
                  {...activeGroup}
                  workspaceId={activeWorkspace}
                  cards={cards.filter(
                    (card) => card.groupId === activeGroup.id
                  )}
                />
              )}
              {activeCard && <Card {...activeCard} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </ul>
      {activeWorkspace && <NewListButton workspace={activeWorkspace} />}
    </div>
  );
};
