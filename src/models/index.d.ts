import { ModelInit, MutableModel, __modelMeta__, OptionallyManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}



type EagerProject = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Project, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly tasks?: (Task | null)[] | null;
  readonly owner?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyProject = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Project, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly tasks: AsyncCollection<Task>;
  readonly owner?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Project = LazyLoading extends LazyLoadingDisabled ? EagerProject : LazyProject

export declare const Project: (new (init: ModelInit<Project>) => Project) & {
  copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
}

type EagerTask = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Task, 'id'>;
  };
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly projectID: string;
  readonly project?: Project | null;
  readonly assignedTo?: string | null;
  readonly owner?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyTask = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Task, 'id'>;
  };
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly projectID: string;
  readonly project: AsyncItem<Project | undefined>;
  readonly assignedTo?: string | null;
  readonly owner?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Task = LazyLoading extends LazyLoadingDisabled ? EagerTask : LazyTask

export declare const Task: (new (init: ModelInit<Task>) => Task) & {
  copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
}