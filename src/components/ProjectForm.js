import React, { useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Project } from '../models';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addProject = async () => {
    if (!name) return;
    await DataStore.save(
      new Project({
        name,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );
    setName('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add New Project</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
      />
      <button onClick={addProject}>Add Project</button>
    </div>
  );
};

export default ProjectForm;