import React from 'react';

import { IProduct } from '../../api/types';

import './Product.scss';

export default function SingleProduct(props: { product: IProduct }) {
  const { product } = props;

  const desc = product.description;
  const textArr = desc ? desc.split('\n') : [];
  const descElement = textArr.map((paragraph, i) => {
    return (
      <p key={i} className="product__description">
        {paragraph}
      </p>
    );
  });

  return (
    <div className="product__infoContainer">
      <img className="product__image" src={product.image} />
      <div>
        <h2 className="product__title">{product.title}</h2>
        <div className="product__description">
          <p>
            Flokkur: {product.category_title} <br />
            Verð: {`${product.price} kr-`}
          </p>
        </div>
        {descElement}
      </div>
    </div>
  );
}
