import {store} from '../../../App';
import {LoginInterface} from '../../models/LoginInterface';
import {UserProfile} from '../../models/Profile';
import {UserInterface} from '../../models/User';
import {loginSuccess, registerSuccess} from '../../state/actions/authActions';
import {PlaceInterface} from '../../models/Place';
import {fetchWithAuthorization, BASE_URL} from './apiBase';
import {
  ACCOUNT_LOGIN,
  ACCOUNT_SIGNUP,
  ACCOUNT_PROFILE,
  ACCOUNT_BY_ID,
  ACCOUNT_FORGOT_PASSWORD,
  ACCOUNT_VALIDATE_RECOVER_TOKEN,
  ACCOUNT_RECOVER_PASSWORD,
  NOMINATIM_SEARCH_URL,
} from './apiUrls';

// Login User
export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginInterface | Error> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${ACCOUNT_LOGIN}`,
      {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) {
      const data: LoginInterface = await response.json();
      store.dispatch(
        loginSuccess(
          data.access_token,
          data.accountId,
          data.activeRol,
          data.slug,
          data.conductorFinishRegistry,
        ),
      );
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
};

// Log Out
export const logOut = async () => {
  store.dispatch(logOut());
};

// Create User
export const createUser = async (
  email: string,
  password: string,
  confirmPassword: string,
): Promise<LoginInterface | Error> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${ACCOUNT_SIGNUP}`,
      {
        method: 'POST',
        body: JSON.stringify({email, password, confirmPassword}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) {
      const data: LoginInterface = await response.json();
      store.dispatch(
        loginSuccess(
          data.access_token,
          data.accountId,
          data.activeRol,
          '',
          false,
        ),
      );
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
};

// Get User by ID
export const getOneById = async (
  accountId: number,
): Promise<UserInterface | Error> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${ACCOUNT_BY_ID}${accountId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
};

// Create Profile Data
export const createProfileData = async (
  accountId: number,
  data: UserProfile,
): Promise<any | Error> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${ACCOUNT_PROFILE}${accountId}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) {
      const res: UserInterface = await response.json();
      store.dispatch(
        registerSuccess(
          res.username as string,
          res.phoneNumber as string,
          res.activeRole as string,
        ),
      );
      return res;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
};

// Submit Code
export const submitCode = async (
  email: string,
): Promise<UserInterface | Error> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${ACCOUNT_FORGOT_PASSWORD}`,
      {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
};

// Validate Code
export const validateCode = async (
  code: string,
  accountId: number,
): Promise<{validated: boolean}> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${ACCOUNT_VALIDATE_RECOVER_TOKEN}${accountId}`,
      {
        method: 'PUT',
        body: JSON.stringify({resetPasswordToken: code}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
};

// Change Password
export const changePassword = async (
  accountId: number,
  newPassword: string,
): Promise<{message: string}> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${ACCOUNT_RECOVER_PASSWORD}${accountId}`,
      {
        method: 'PUT',
        body: JSON.stringify({newPassword}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
};

// Places API
export const placesApi = async (
  query: string,
): Promise<Array<PlaceInterface> | Error> => {
  try {
    const response = await fetch(
      `${NOMINATIM_SEARCH_URL}?format=json&q=${query}`,
    );
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
};

// Update Account
export const updateAccount = async (
  accountId: number,
  account: Partial<UserInterface>,
): Promise<any> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${ACCOUNT_BY_ID}${accountId}`,
      {
        method: 'PUT',
        body: JSON.stringify(account),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
};
