import { StatusEnum } from 'src/app/core/enums/general.enum';

export interface IUserscount {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}

export interface ITasksCount {
  toDo: number;
  inProgress: number;
  done: number;
}
export interface IProjectPayload {
  title: string;
  description: string;
}
export interface IProject {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  task: unknown[];
  manager: IManager;
}
export interface IManager {
  id: number;
  userName: string;
  imagePath: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string | null;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}
export interface IResponse<T = unknown> {
  pageNumber: number;
  pageSize: number;
  data: T[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface IManager {
  id: number;
  userName: string;
  imagePath: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string | null;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: StatusEnum;
  creationDate: string;
  modificationDate: string;
  project: IProject;
  employee: IPerson;
}

export interface IPerson {
  id: number;
  userName: string;
  imagePath: null | string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: null | string;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}
