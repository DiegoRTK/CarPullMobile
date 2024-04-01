import {CarInterface} from '../../models/Car';
import {BASE_URL, fetchWithAuthorization} from './apiBase';
import {CAR_BASE, CAR_BY_ACCOUNT} from './apiUrls';

export const createCar = async (
  car: CarInterface,
): Promise<CarInterface | Error> => {
  try {
    const response = await fetchWithAuthorization(`${BASE_URL}${CAR_BASE}`, {
      method: 'POST',
      body: JSON.stringify(car),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
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

export const updateCar = async (
  car: CarInterface,
  carId: string,
): Promise<CarInterface | Error> => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${CAR_BASE}${carId}`,
      {
        method: 'PUT',
        body: JSON.stringify(car),
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

export const getCarByAccount = async (accountId: number) => {
  try {
    const response = await fetchWithAuthorization(
      `${BASE_URL}${CAR_BY_ACCOUNT}?accountId=${accountId}`,
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
