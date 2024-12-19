import React, { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Project } from '../models';

const ProjectList = ({ onSelectProject }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();

    const subscription = DataStore.observe(Project).subscribe(() => fetchProjects());

    return () => subscription.unsubscribe();
  }, []);

  const fetchProjects = async () => {
    const projectsData = await DataStore.query(Project);
    setProjects(projectsData);
  };

  return (
    <div>
      <h2>Your Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => onSelectProject(project)}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;