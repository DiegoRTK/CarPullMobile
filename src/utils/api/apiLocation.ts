import {LocationInterface} from '../../models/Location';
import {BASE_URL, fetchWithAuthorization} from './apiBase';
import {LOCATION_BY_ID} from './apiUrls';

export const createLocation = async (
  location: LocationInterface,
): Promise<LocationInterface | Error> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${LOCATION_BY_ID}`,
      {
        method: 'POST',
        body: JSON.stringify(location),
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

export const updateLocation = async (
  accountId: string,
  location: LocationInterface,
): Promise<LocationInterface | Error> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${LOCATION_BY_ID}${accountId}`,
      {
        method: 'PUT',
        body: JSON.stringify(location),
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

export const getLocationsByAccount = async (
  accountId: number,
): Promise<Array<LocationInterface> | Error> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${LOCATION_BY_ID}by-account?accountId=${accountId}`,
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
}