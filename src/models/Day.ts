export interface DayInterface {
  dates: Date[];
  time: string;
  workHour: string;
  accountId: number;
  locationId?: number;
  latitude: string;
  longitude: string;
  reference: string;
  address: string;
}

export interface DaysCreated {
  dayId: number;
  date: Date;
  time: string;
  workHour: string;
  travelState: string;
  lastMessageId: null;
  createdAt: Date;
  accountId: number;
  slug: string;
  referenceAddress: null;
  phoneNumber: string;
  dni: null;
  username: string;
  email: string;
  location: Location;
  travels: any[];
  chat: null;
  latitude: string;
  longitude: string;
  reference: string;
  address: string;
}

export interface Location {
  locationId: number;
  address: string;
  latitude: string;
  longitude: string;
  reference: string;
  createdAt: Date;
}
