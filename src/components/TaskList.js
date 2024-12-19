import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Task } from '../models';

const TaskList = ({ project }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (project) {
      fetchTasks();

      const subscription = DataStore.observe(Task).subscribe(() => fetchTasks());

      return () => subscription.unsubscribe();
    }
  }, [project]);

  const fetchTasks = async () => {
    const tasksData = await DataStore.query(Task, (t) => t.projectID('eq', project.id));
    setTasks(tasksData);
  };

  const toggleStatus = async (task) => {
    await DataStore.save(
      Task.copyOf(task, (updated) => {
        updated.status =
          task.status === 'PENDING'
            ? 'IN_PROGRESS'
            : task.status === 'IN_PROGRESS'
            ? 'COMPLETED'
            : 'PENDING';
      })
    );
  };

  const deleteTask = async (id) => {
    const toDelete = await DataStore.query(Task, id);
    await DataStore.delete(toDelete);
  };

  return (
    <div>
      <h3>Tasks for {project.name}</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>{task.title}</strong> - {task.status}
              {task.deadline && (
                <span> | Due: {new Date(task.deadline).toLocaleDateString()}</span>
              )}
              {task.assignedTo && <span> | Assigned to: {task.assignedTo}</span>}
            </div>
            <div>
              <button onClick={() => toggleStatus(task)}>Toggle Status</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;