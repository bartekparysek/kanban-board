import { Settings } from '../../assets/icons';
import s from './WorkspaceSettings.module.scss';

export const WorkspaceSettings = () => {
  return (
    <button className={s.workspaceSettings}>
      <Settings />
    </button>
  );
};
