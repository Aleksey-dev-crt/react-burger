import PropTypes from 'prop-types'

export const typeOfIngredient = {
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
}

export const typeOfOrder = {
  createdAt: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  number: PropTypes.number,
  status: PropTypes.string,
  updatedAt: PropTypes.string,
  _id: PropTypes.string,  
}

export interface ILocationState {
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

