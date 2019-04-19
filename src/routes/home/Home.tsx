import React, { Fragment, useEffect, useState } from "react";
import Helmet from "react-helmet";

import { ICategory, IProduct } from "../../api/types";

import Categories from "../../components/categories/Categories";
import Products from "../../components/products/Products";
import Button from "./../../components/button/Button";

import "./Home.scss";

import { getCategories, getProducts } from "../../api/index";

export default function Home() {
  const [products, setProduct] = useState<Array<IProduct> | null>([]); // tslint:disable-line
  const [categories, setCategories] = useState<Array<ICategory> | null>([]); // tslint:disable-line
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const myProducts: IProduct[] | null = await getProducts();
    const myCategories: ICategory[] | null = await getCategories();
    setProduct(myProducts);
    setCategories(myCategories);

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Helmet title="Forsíða" />
      {loading &&
        <h2 className="home__heading">Sæki gögn...</h2>
      }
      {!loading && (
        <Fragment>
          <h2 className="home__heading">Nýjar vörur</h2>
          <div className="home__row">
            {products && <Products productList={products} />}
            <Button className="home__button">Skoða alla flokka</Button>
          </div>
          {categories && (
            <Categories isFrontPage={true} categorieList={categories} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
