import { JwtPayload } from "jwt-decode";

export interface IDecodedToken extends JwtPayload {
  userId: number;
  roles: string[];
  userName: string;
  userEmail: string;
  userGroup: string;
  exp: number;
  iat: number;
}
