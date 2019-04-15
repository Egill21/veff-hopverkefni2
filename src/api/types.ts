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

export interface IlogInInfo {
  user: IUser;
  token: string;
  expiresIn: number;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  admin: boolean;
}

export interface ILogInError {
  field: string;
  error: string;
}

export interface Links {
  self: Self;
  prev: Prev;
  next: Next;
}

export interface Self {
  href: string;
}
export interface Prev {
  href: string;
}
export interface Next {
  href: string;
}

// todo fleiri týpur
