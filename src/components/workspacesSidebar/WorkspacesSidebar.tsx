import s from './WorkspacesSidebar.module.scss';
import { UserProfile } from '../UserProfile';
import { WorkspaceSettings } from '../WorkspaceSettings';
import { Header } from './components/Header';

export const WorkspacesSidebar = () => {
  return (
    <div className={s.workspaces}>
      <Header />
      <div className={s.main}></div>
      <div className={s.footer}>
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
