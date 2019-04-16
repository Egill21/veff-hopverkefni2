import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
// import { useAsyncEffect } from 'use-async-effect';

import { IProduct, ICategory } from '../../api/types';

import Products from '../../components/products/Products';
import Button from './../../components/button/Button';
import Categories from '../../components/categories/Categories';

import './Home.scss';

import { getProducts, getCategories, login } from '../../api/index';

export default function Home() {
  const [products, setProduct] = useState<Array<IProduct> | null>([]);
  const [categories, setCategories] = useState<Array<ICategory> | null>([]);
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
      <div className="home">
        <Helmet title="Forsíða" />
        <div className="home__container">
          <h2 className="home__heading">Nýjar vörur</h2>
          {products && <Products productList={products} />}
          <Button className="home__button">Skoða alla flokka</Button>
          {categories && <Categories isFrontPage={true} categorieList={categories} ></Categories>}
        </div>
      </div>
    </Fragment>
  );
}
