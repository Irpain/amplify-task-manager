import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <div className="App-content">
            <div className="auth-container">
              <header className="App-header">
                <h1>Welcome, {user?.username || "User"}!</h1>
                <button className="sign-out-button" onClick={signOut}>
                  Sign Out
                </button>
              </header>
              <main className="App-main">
                <div className="projects-section">
                  <h2>Your Projects</h2>
                  <ProjectForm />
                  <ProjectList onSelectProject={setSelectedProject} />
                </div>
                <div className="tasks-section">
                  <h2>Tasks</h2>
                  {selectedProject ? (
                    <>
                      <TaskForm project={selectedProject} />
                      <TaskList project={selectedProject} />
                    </>
                  ) : (
                    <p>Please select a project to manage its tasks.</p>
                  )}
                </div>
              </main>
            </div>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default App;