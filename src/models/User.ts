import {ROLES_ENUM} from '../enum/roles-enum';
import {LoginInterface} from './LoginInterface';
import {Rol} from './Role';

export interface UserInterface extends LoginInterface {
  roles: Rol[];
  isConductor: boolean;
  active: boolean;
  activeRole?: ROLES_ENUM | string;
  createdAt: Date;
  dni?: string;
  email?: string;
  validationData?: string;
  referenceAddres?: string;
  phoneNumber?: string;
  workHour?: string;
  username?: string;
  resetPasswordToken?: string;
  verificationTokenExpiration?: string;
  carRegistry?: boolean;
  locationsRegistry?: boolean;
  daysRegistry?: boolean;
}
