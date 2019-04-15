import React, { Fragment, useState, useEffect } from 'react';

import { IProduct } from '../../api/types';
import { getProduct } from '../../api/index';

import SingleProduct from '../../components/product/Product';

export default function Product(props: any) {

  const { match } = props;
  const { id } = match.params;
  
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const myProduct: IProduct = await getProduct(id);
    setProduct(myProduct);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <p>waddafaack veit ekki af hverju thetta virkar ekki tharna nidri</p>
  )

/*   return (
    <Fragment>
      {product && 
        <SingleProduct product={product} />
      }
    </Fragment>
  ); */
}
