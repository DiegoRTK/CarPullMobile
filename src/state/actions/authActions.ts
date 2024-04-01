export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const loginSuccess = (
  accessToken: string,
  accountId: number,
  activeRole: string,
  slug: string,
  conductorFinishRegistry: boolean,
  username?: string,
  phoneNumber?: string,
) => ({
  type: LOGIN_SUCCESS,
  payload: {
    accessToken,
    accountId,
    activeRole,
    slug,
    conductorFinishRegistry,
    username,
    phoneNumber,
  },
});

export const registerSuccess = (
  username: string,
  phoneNumber: string,
  activeRole: string,
) => ({
  type: REGISTER_SUCCESS,
  payload: {username, phoneNumber, activeRole},
});

export const logout = () => ({
  type: LOGOUT,
});
