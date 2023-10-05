import './App.scss';
import { Board } from './components/Board';
import { WorkspacesSidebar } from './components/WorkspacesSidebar';

export const App = () => {
  return (
    <div className="container">
      <WorkspacesSidebar />
      <Board />
    </div>
  );
};
