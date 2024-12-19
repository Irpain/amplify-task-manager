// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "PENDING": "PENDING",
  "IN_PROGRESS": "IN_PROGRESS",
  "COMPLETED": "COMPLETED"
};

const { Project, Task } = initSchema(schema);

export {
  Project,
  Task,
  Status
};