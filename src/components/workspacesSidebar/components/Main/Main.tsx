import s from './Main.module.scss';
import * as Icons from '../../../../assets/icons';
import { Dashboard, Boards, Profile, Search } from '../../../../assets/icons';
import clsx from 'clsx';
export const Main = () => {
  const icons = Object.keys({ Dashboard, Boards, Profile, Search });

  return (
    <div className={s.main}>
      <ul className={s.list}>
        {icons.map((icon) => {
          const Icon = Icons[icon as keyof typeof Icons];
          return (
            <li
              key={icon}
              className={clsx(s.element, {
                [s.boards]: icon === 'Boards',
              })}
            >
              <Icon />
              {icon}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
