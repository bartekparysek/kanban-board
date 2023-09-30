import s from './WorkspacesSidebar.module.scss';
import { UserProfile } from '../UserProfile';
import { WorkspaceSettings } from '../WorkspaceSettings';

export const WorkspacesSidebar = () => {
  return (
    <div className={s.workspaces}>
      <div className={s.header}></div>
      <div className={s.main}></div>
      <div className={s.footer}>
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
