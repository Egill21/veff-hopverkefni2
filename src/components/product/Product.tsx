import React from 'react';

import { IProduct } from '../../api/types';

export default function SingleProduct(props: { product: IProduct }) {

  const { product } = props;

  console.log(product);

  return (
    <p>product</p>
  );
}