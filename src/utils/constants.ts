// En utils/constants.ts

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profiling: {accountId: number};
  Travels: {accountId: number};
  ForgotPassword: undefined;
  NewPassword: {accountId: number};
  DriverRegisterHome: {accountId: number};
  PickupPoint: {accountId: number};
  CarRegister: {accountId: number};
  Schedule: {accountId: number};
};

export const mainColor = 'rgb(54, 81, 251)';

export const mainFocusedColor = 'rgb(255, 234, 5)';

export const lightedColor = 'rgb(48, 76, 252)';

export const successColor = 'rgb(0, 182, 6)';

export const errorColor = 'crimson';

export const whiteColor = 'white';

export type ProfileScreenRouteProp<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;

export type ScreenNavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: ProfileScreenRouteProp<T>;
};
