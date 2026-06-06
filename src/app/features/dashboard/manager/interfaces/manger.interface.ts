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
  task: any[];
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
