import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
// import { useAsyncEffect } from 'use-async-effect';

import { IProduct, ICategory } from '../../api/types';

import './Home.scss';

import { getProducts, getCategories } from "../../api/index";

export default function Home() {

  const [products, setProduct] = useState<Array<IProduct> | null>([]);
  const [categories, setCategories] = useState<Array<ICategory> | null>([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const myProducts : IProduct[] | null = await getProducts();
    const myCategories : ICategory[] | null = await getCategories();
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
      <p>Home</p>
    </Fragment>
  );
}