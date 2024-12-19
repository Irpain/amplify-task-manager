import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Task } from '../models';

const TaskForm = ({ project }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Fetch users from Cognito or maintain a user list
    // For simplicity, we'll use placeholder usernames
    setUsers(['user1', 'user2', 'user3']);
  };

  const addTask = async () => {
    if (!title) return;
    await DataStore.save(
      new Task({
        title,
        description,
        status: 'PENDING',
        deadline: deadline ? new Date(deadline).toISOString() : null,
        projectID: project.id,
        assignedTo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setDeadline('');
  };

  return (
    <div>
      <h3>Add New Task to {project.name}</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
        <option value="">Assign To</option>
        {users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        placeholder="Deadline"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;