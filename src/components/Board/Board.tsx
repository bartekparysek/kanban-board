import s from './Board.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import type {
  Board as BoardType,
  Group as GroupType,
} from '../../store/store.types';
import { NewListButton } from './components/NewListButton/NewListButton';
import { Group } from './components/Group/Group';

export const Board = () => {
  const activeWorkspace = useSelector<RootState, BoardType['activeWorkspace']>(
    (state) => state.board.activeWorkspace
  );
  const groups = useSelector<RootState, GroupType[]>((state) =>
    activeWorkspace ? state.groups[activeWorkspace] : []
  );
  console.log(groups);

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {groups &&
          groups.length > 0 &&
          groups.map((el) => (
            <li key={el.id}>
              <Group {...el} workspaceId={activeWorkspace} />
            </li>
          ))}
      </ul>
      <NewListButton workspace={activeWorkspace} />
    </div>
  );
};
