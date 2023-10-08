import s from './WorkspacesSidebar.module.scss';
import { UserProfile } from '../UserProfile';
import { WorkspaceSettings } from '../WorkspaceSettings';
import { Header } from './components/Header';
import { Main } from './components/Main';

export const WorkspacesSidebar = () => {
  return (
    <div className={s.workspaces}>
      <Header />
      <Main />
      <div className={s.footer}>
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
