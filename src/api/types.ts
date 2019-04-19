import { string } from "prop-types";

export interface ICategory {
  id: number;
  title: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category_id: number;
  category_title: string;
  description?: string;
  created?: Date;
  updated?: Date;
}

export interface ICartline {
  id: number;
  quantity: number;
  created?: Date;
  updated?: Date;
  product_id: number;
  title: string;
  price: number;
  description?: string;
  image: string;
  category_id: number;
  category_title: string;
  total: number;
}

export interface ICart {
  id: number;
  created: Date;
  updated: Date;
  lines: ICartline[];
  total: number;
  name?: string;
  address?: string;
  user_id?: number;
}

export interface IProducts {
  limit: number;
  offset: number;
  items: IProduct[];
  _links: Links;
}

export interface ICategories {
  limit: number;
  offset: number;
  items: ICategory[];
  _links: object;
}

export interface IOrder {
  id: number;
  name: string;
  address: string;
  created: Date;
  updated: Date;
  user_id: number;
}

export interface IOrders {
  limit: number;
  offset: number;
  items: IOrder[];
  _links: Links;
}

export interface ILogInInfo {
  user: IUser | null;
  token: string;
  expiresIn: number;
  loggedin?: boolean;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  admin: boolean;
}

export interface IErrorArray {
  errors: IFieldError[];
  loggedin?: boolean;
  user?: IUser;
  token?: string;
}

export interface IFieldError {
  field: string;
  error: string;
}

export interface ISingleError {
  error: string;
}

export interface Links { // tslint:disable-line
  self: Self;
  prev: Prev;
  next: Next;
}

export interface Self { // tslint:disable-line
  href: string;
}
export interface Prev { // tslint:disable-line
  href: string;
}
export interface Next { // tslint:disable-line
  href: string;
}

export interface IContext {
  fetching: boolean;
  authenticated: boolean;
  user: IUser;
  token: string | null;
  message: IErrorArray | null;
  logginUser: any;
  loggoutUser: any;
}
