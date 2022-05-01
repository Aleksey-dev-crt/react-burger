import { ReactNode } from 'react';

export interface ILocation {
  from: {
    pathname: string;
  };
}

export interface IParams {
  id: string;
};

export interface IModalDetailsProps {
  modal?: boolean,
}

export interface IModalProps {
  onClose?: () => { type: string; payload: any; } | void
  children: ReactNode
}

export interface IIngredient {
  calories: number
  carbohydrates: number
  constructorID: string
  count: number
  fat: number
  image: string
  image_large: string
  image_mobile: string
  name: string
  price: number
  proteins: number
  type: string
  __v: number
  _id: string
  orderCount?: number
}

export interface IOrdersInfo {
  orders: Array<IOrder> | [],
  total: number,
  totalToday: number
}

export interface IOrder {
  createdAt: string
  ingredients: string[]
  name: string
  number: number
  status: string
  updatedAt: string
  _id: string
}

export interface ISaveUserData {
  refreshToken: string
  name: string 
  login: string 
  password: string 
}

