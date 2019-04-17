import {
  IProduct,
  IProducts,
  ICategory,
  ICategories,
  IlogInInfo,
  ILogInError,
  ICart,
  ICartline,
  IOrder,
  IOrders,
} from './types';

// Sækja slóð á API úr env
const baseurl: string | undefined = process.env.REACT_APP_API_URL;

async function getProduct(id: number | string): Promise<IProduct> {
  const url = new URL(String(id), `${baseurl}products/`);
  const response = await fetch(url.href);

  return response.json();
}

async function getProducts(limit?: number): Promise<Array<IProduct> | null> {
  const url = new URL(`${baseurl}products?limit=${limit ? limit : 12}`);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const prods: IProducts = await response.json();

  return prods.items;
}

async function getPagedProducts(
  categoryID: number,
  slug?: string
): Promise<IProducts | null> {
  let myURL = `${baseurl}products?limit=12&category=${categoryID}`;

  if (slug) {
    myURL = `${slug}&category=${categoryID}`;
  }

  const url = new URL(myURL);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function getMoreProducts(
  categoryID: number
): Promise<Array<IProduct> | null> {
  const url = new URL(`${baseurl}products?limit=6&category=${categoryID}`);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const prods: IProducts = await response.json();

  return prods.items;
}

async function getCategories(): Promise<Array<ICategory> | null> {
  const url = new URL(`${baseurl}categories?limit=12`);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const cats: ICategories = await response.json();

  return cats.items;
}

async function getCategory(id: number): Promise<ICategory | null> {
  const url = new URL(`${baseurl}categories/${id}`);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }
  return response.json();
}

async function login(
  userName: string,
  password: string
): Promise<IlogInInfo | ILogInError | null> {
  const url = new URL(`${baseurl}users/login`);
  const response = await fetch(url.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: userName, password: password })
  });
  const status: number = response.status;
  console.log('TCL: status', status);

  let temp: any = await response.json();

  if (status !== 200) {
    console.log(temp);
    if (!temp.errors.length) {
      temp.errors.field = 'Username';
      return {
        errors: [temp],
        loggedin: false
      };
    }
    return {
      errors: temp,
      loggedin: false
    };
  }

  let info: IlogInInfo = temp;
  info.loggedin = true;

  return info;
}

async function post2(addUrl: string, data?: object) {
  const url = new URL(`${baseurl}${addUrl}`);
  const response = await fetch(url.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const final = {
    status: response.status,
    response: await response.json()
  };
  return final;
}

async function register(userName: string, password: string, email: string) {
  const url = new URL(`${baseurl}users/register`);
  const response = await fetch(url.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userName,
      email: email,
      password: password
    })
  });

  return await response.json();
}

async function logOut() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

async function getCart(token: string): Promise<ICart> {
  console.log(token);
  const url = new URL(`${baseurl}cart`);
  const response = await fetch(url.href, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
}

async function addToCart(
  productID: number,
  quantity: number,
  token: string | null
): Promise<void> {
  const url = new URL(`${baseurl}cart`);
  await fetch(url.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      product: productID,
      quantity: quantity
    })
  });
}

async function updateCart(lineID: number, quantity: number, token: string | null):Promise<ICartline | ILogInError> {
  const url = new URL(`${baseurl}cart/line/${lineID}`);
  const response = await fetch(url.href, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      quantity: quantity
    })
  });
  return response.json();
}

async function deleteFromCart(lineID: number, token: string | null):Promise<void> {
  const url = new URL(`${baseurl}cart/line/${lineID}`);
  await fetch(url.href, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

async function createOrder(name: string, address: string, token: string | null):Promise<void> {
  const url = new URL(`${baseurl}orders`);
  await fetch(url.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: name,
      address: address
    })
  });
}

async function getOrders(token: string | null):Promise<IOrders> {
  const url = new URL(`${baseurl}orders`);
  const response = await fetch(url.href, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.json();
}

async function getOrder(token: string, id: string):Promise<ICart> {
  const url = new URL(id, `${baseurl}orders/`);
  const response = await fetch(url.href, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.json();
}

export {
  getProduct,
  getProducts,
  getPagedProducts,
  getMoreProducts,
  getCategories,
  getCategory,
  getOrders,
  getOrder,
  addToCart,
  updateCart,
  deleteFromCart,
  createOrder,
  login,
  register,
  logOut,
  post2,
  getCart
};
