import {
  ICart,
  ICartline,
  ICategories,
  ICategory,
  IErrorArray,
  ILogInInfo,
  IOrder,
  IOrders,
  IProduct,
  IProducts,
  ISingleError,
} from "./types";

// Sækja slóð á API úr env
const baseurl: string | undefined = process.env.REACT_APP_API_URL;

async function getProduct(id: number | string): Promise<IProduct | string> {
  const url = new URL(String(id), `${baseurl}products/`);
  const response = await fetch(url.href);

  if (response.status === 200) {
    return response.json();
  }

  if (response.status === 404) {
    return "Not Found";
  }

  return "Error";
}

async function getProducts(limit?: number): Promise<Array<IProduct> | null> { // tslint:disable-line
  const url = new URL(`${baseurl}products?limit=${limit ? limit : 12}`);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const prods: IProducts = await response.json();

  return prods.items;
}

async function getPagedProducts(info: {
  categoryID: number,
  slug?: string,
  searchslug?: string,
}): Promise<IProducts | null> {
  const { categoryID, slug, searchslug } = info;
  let myURL = `${baseurl}products?limit=12&category=${categoryID}`;

  if (slug) {
    myURL = `${slug}&category=${categoryID}`;
  }

  if (searchslug) {
    myURL = `${baseurl}products?category=${categoryID}&search=${searchslug}`;
  }

  const url = new URL(myURL);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function getMoreProducts(
  categoryID: number,
): Promise<Array<IProduct> | null> { // tslint:disable-line
  const url = new URL(`${baseurl}products?limit=6&category=${categoryID}`);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const prods: IProducts = await response.json();

  return prods.items;
}

async function getCategories(): Promise<Array<ICategory> | null> { // tslint:disable-line
  const url = new URL(`${baseurl}categories?limit=12`);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const cats: ICategories = await response.json();

  return cats.items;
}

async function getCategory(id: number): Promise<ICategory | string> {
  const url = new URL(`${baseurl}categories/${id}`);
  const response = await fetch(url.href);

  if (response.status === 200) {
    return response.json();
  }

  if (response.status === 404) {
    return "Not Found";
  }
  return "Error";
}

async function login(
  userName: string,
  password: string,
): Promise<any> {
  const url = new URL(`${baseurl}users/login`);
  const response = await fetch(url.href, {
    method: "POST",
    headers: { // tslint:disable-line
      Accept: "application/json", // tslint:disable-line
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: userName, password: password }), // tslint:disable-line
  });

  return response.json();

  /*   const status: number = response.status;
    console.log('TCL: status', status);

    const temp: any = await response.json();

    if (status !== 200) {
      if (!temp.errors.length) {
        temp.errors.field = "Username";
        return {
          errors: [temp],
          loggedin: false,
        };
      }
      return {
        errors: temp,
        loggedin: false,
      };
    }

    const info: ILogInInfo = temp;
    info.loggedin = true;

    return info; */
}

async function post2(addUrl: string, data?: object) {
  const url = new URL(`${baseurl}${addUrl}`);
  const response = await fetch(url.href, {
    method: "POST",
    headers: { // tslint:disable-line
      Accept: "application/json", // tslint:disable-line
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const final = {
    response: await response.json(),
    status: response.status,
  };
  return final;
}

async function register(userName: string, password: string, email: string) {
  const url = new URL(`${baseurl}users/register`);
  const response = await fetch(url.href, {
    method: "POST",
    headers: { // tslint:disable-line
      Accept: "application/json", // tslint:disable-line
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName,
      email: email, // tslint:disable-line
      password: password // tslint:disable-line
    }),
  });

  return await response.json();
}

async function logOut() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

async function getCart(token: string): Promise<ICart | string> {
  const url = new URL(`${baseurl}cart`);
  const response = await fetch(url.href, {
    method: "GET",
    headers: { // tslint:disable-line
      Accept: "application/json", // tslint:disable-line
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    return response.json();
  }

  if (response.status === 404) {
    return "Not Found";
  }

  if (response.status === 401) {
    return "No Access";
  }

  return "Error";

}

async function addToCart(
  productID: number,
  quantity: number,
  token: string | null,
): Promise<void> {
  const url = new URL(`${baseurl}cart`);
  await fetch(url.href, {
    method: "POST",
    headers: { // tslint:disable-line
      Accept: "application/json", // tslint:disable-line
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // tslint:disable-line
    },
    body: JSON.stringify({
      product: productID,
      quantity: quantity, // tslint:disable-line
    }),
  });
}

async function updateCart(lineID: number, quantity: number, token: string | null): Promise<ICartline | IErrorArray> {
  const url = new URL(`${baseurl}cart/line/${lineID}`);
  const response = await fetch(url.href, {
    method: "PATCH",
    headers: { // tslint:disable-line
      Accept: "application/json", // tslint:disable-line
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // tslint:disable-line
    },
    body: JSON.stringify({
      quantity: quantity, // tslint:disable-line
    }),
  });
  return response.json();
}

async function deleteFromCart(lineID: number, token: string | null): Promise<void> {
  const url = new URL(`${baseurl}cart/line/${lineID}`);
  await fetch(url.href, {
    method: "DELETE",
    headers: { // tslint:disable-line
      Accept: "application/json", // tslint:disable-line
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // tslint:disable-line
    },
  });
}

async function createOrder(name: string, address: string, token: string | null): Promise<string | IErrorArray> {
  const url = new URL(`${baseurl}orders`);
  const response = await fetch(url.href, {
    method: "POST",
    headers: { // tslint:disable-line
      Accept: "application/json", // tslint:disable-line
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // tslint:disable-line
    },
    body: JSON.stringify({
      name: name, // tslint:disable-line
      address: address, // tslint:disable-line
    }),
  });

  if (response.status === 400) {
    return response.json();
  }

  if (response.status === 201) {
    return "Success";
  }

  if (response.status === 401) {
    return "No Access";
  }

  return "Not Found";
}

async function getOrders(token: string | null): Promise<IOrders> {
  const url = new URL(`${baseurl}orders`);
  const response = await fetch(url.href, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

async function getOrder(token: string, id: string): Promise<ICart | string> {
  const url = new URL(id, `${baseurl}orders/`);
  const response = await fetch(url.href, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.json();
  }

  if (response.status === 404) {
    return "Not Found";
  }

  if (response.status === 401) {
    return "No Access";
  }

  return "Error";
}

export {
  getCart,
  getMoreProducts,
  getProduct,
  getProducts,
  getPagedProducts,
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
};
