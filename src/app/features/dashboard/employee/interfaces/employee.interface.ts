import { StatusEnum } from 'src/app/core/enums/general.enum';

export interface IResponse<T = unknown> {
  pageNumber: number;
  pageSize: number;
  data: T[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: StatusEnum;
  creationDate: string;
  modificationDate: string;
  project: IProject;
  employee: IEmployee;
}

export interface IEmployee {
  id: number;
  userName: string;
  imagePath: null;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
}
