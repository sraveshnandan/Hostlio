/* This file only exports all types declarations. */

export interface IRegistrationPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar?: {
    public_id: string;
    url: string;
  };
}

export interface Ibanner {
  public_id?: string;
  url: string;
}

export interface IUserProfilLinks {
  name: string;
  icon: string;
  link?: string;
}

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  avatar: Ibanner;
  email: string;
  email_verified: boolean;
  role: string;
  phone_no: number;
  email_verification?: {
    otp: string;
    expiry: string;
  };
  recomendation: {
    city: string;
    flat: boolean;
    Hostel: boolean;
    PG: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Icategory {
  _id: string;
  name: string;
  image: Ibanner;
  creator: IUser;
  cretedAt: Date;
  updatedAt: Date;
}

export interface Inotifications {
  _id: string;
  unreaded: boolean;
  title: string;
  description: string;
  reciver: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExtraDetails {
  main_city: string;
  details: string;
  distance: IDistanceDetails;
  friends_allowed: boolean;
  for_all: boolean;
  for_family: boolean;
  for_girls: boolean;
  for_boys: boolean;
  free_electricty: boolean;
}

export interface IDistanceDetails {
  railway_station: number;
  library: number;
  mall: number;
  medical_shop: number;
}

export interface IListing {
  _id: string;
  name: string;
  category: Icategory;
  banners: Ibanner[];
  video?: {
    url: string;
  };
  facilities: string[];
  opening_time: string;
  closing_time: string;
  owner: IUser;
  address: string;
  contact_no: string;
  no_of_rooms: number;
  monthly_rent: number;
  electricity_cost: number;
  extra: IExtraDetails;
  is_call_allowed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  image: Ibanner;
  creator: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNewConversationPayload {
  listingId?: string;
  userId: string;
  ownerId?: string;
}

export interface IMessage {
  _id: string;
  sender: string;
  content: string;
  createdAt: string;
}

export type ConversationType = {
  _id: string;
  senderId: string;
  participants: Record<string, any>[];
  listing: Record<string, any>;
  messages: IMessage[];
  createdAt: string;
};
