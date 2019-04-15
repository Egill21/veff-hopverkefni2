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
  _links: object;
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

// todo fleiri týpur
