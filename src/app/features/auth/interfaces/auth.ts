import { JwtPayload } from 'jwt-decode';

export interface ICurrentUser {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath?: string;
  group: IGroup;
  creationDate: string;
  modificationDate: string;
}

export interface IGroup {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface IDecodedToken extends JwtPayload {
  userId: number;
  roles: string[];
  userName: string;
  userEmail: string;
  userGroup: string;
  exp: number;
  iat: number;
}
export interface IVerify {
  email: string;
  code: string;
}
export interface ILogin {
  email: string;
  password: string;
}
// ======Response Interfaces=======
export interface ILoginResponse {
  token: string;
  expiresIn: string;
}
export interface IRegisterResponse {
  message: string;
}
