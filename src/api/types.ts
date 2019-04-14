export interface ICategory {
  id: number;
  title: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category: ICategory;
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

// todo fleiri týpur
