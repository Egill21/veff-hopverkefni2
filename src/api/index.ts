import { IProduct, IProducts, ICategory, ICategories } from './types';

// Sækja slóð á API úr env
const baseurl:string | undefined = process.env.REACT_APP_API_URL;

async function getProduct(id: number | string) : Promise<IProduct> {

  const url = new URL(String(id), `${baseurl}products/`);
  const response = await fetch(url.href);

/*   const product: IProduct = {
    category: {
      id: 10,
      title: "Flokkur",
    },
    id: 1,
    image: '',
    price: 100,
    title: "Prufuvara",
  }; */

  return response.json();
}

async function getProducts() : Promise<Array<IProduct> | null> {
  const url = new URL(`${baseurl}products?limit=12`);
  const response = await fetch(url.href);
  
  if (!response.ok) {
    return null;
  }

  const prods : IProducts = await response.json();

  return prods.items;
}

async function getCategories(): Promise<Array<ICategory> | null> {
  const url = new URL(`${baseurl}categories?limit=12`);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const cats : ICategories = await response.json();

  return cats.items;
}

export {
  getProduct,
  getProducts,
  getCategories,
};
