import React, { useState } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager App</h1>
        <AmplifySignOut />
        <div className="container">
          <div className="projects-section">
            <ProjectForm />
            <ProjectList onSelectProject={setSelectedProject} />
          </div>
          <div className="tasks-section">
            {selectedProject ? (
              <>
                <TaskForm project={selectedProject} />
                <TaskList project={selectedProject} />
              </>
            ) : (
              <p>Select a project to view its tasks.</p>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default withAuthenticator(App);