import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
// import { useAsyncEffect } from 'use-async-effect';

import { IProduct, ICategory } from '../../api/types';

import Products from '../../components/products/Products';
import Button from './../../components/button/Button';

import './Home.scss';

import { getProducts, getCategories } from "../../api/index";

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
        <h2 className="home__heading">Nýjar vörur</h2>
        {products &&
          <Products productList={products} />
        }
        <Button className="home__button">Skoða alla flokka</Button>
        <h3 className="home__subheading">Skoðaðu vöruflokkana okkar</h3>
        <div className="home__categories">
          {categories &&
            categories.map((category, i) => {
              return (
                <div key={i} className="home__category">
                  <p className="category">{category.title}</p>
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
}