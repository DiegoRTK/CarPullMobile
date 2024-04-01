import {Platform} from 'react-native';
import {store} from '../../../App';

export const BASE_URL = `http://${
  Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2'
}:3000/api`;

//"Interceptor"
export const fetchWithAuthorization = async (
  url: string,
  options: RequestInit = {},
) => {
  const state = store.getState();
  const accessToken = state.auth?.access_token;
  if (accessToken) {
    const modifiedOptions = {...options};
    modifiedOptions.headers = {
      ...modifiedOptions.headers,
      Authorization: `Bearer ${accessToken}`,
    };
    return fetch(url, modifiedOptions);
  }
  return fetch(url, options);
};
