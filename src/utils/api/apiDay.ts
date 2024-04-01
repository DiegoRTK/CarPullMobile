import {DayInterface, DaysCreated} from '../../models/Day';
import {BASE_URL, fetchWithAuthorization} from './apiBase';
import {DAY_BASE, DAY_BY_ACCOUNT} from './apiUrls';

export const getDaysByAccount = async (
  accountId: number,
  isDriverMode: boolean = false,
): Promise<Array<DaysCreated> | Error> => {
  try {
    console.log(accountId)
    const response = await fetchWithAuthorization(
      `${BASE_URL}${DAY_BY_ACCOUNT}?accountId=${accountId}&isDriverMode=${isDriverMode}`,
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

export const createNewDay = async (
  day: DayInterface,
): Promise<DayInterface | Error> => {
  try {
    console.log(day);
    const response = await fetchWithAuthorization(
      `${BASE_URL}${DAY_BASE}many`,
      {
        method: 'POST',
        body: JSON.stringify(day),
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
