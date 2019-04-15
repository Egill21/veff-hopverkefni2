import React, { Fragment } from 'react';
import { IProduct, ICategory } from '../../api/types';

import './Products.scss';

export default function Products(props: { productList: IProduct[] }) {
  const { productList } = props;
  return (
    <div className="products__container">
      {productList.map((product, i) => {
        return (
          <div key={i} className="products__product">
            <img className="products__box" src={product.image} />
            <div className="products__info">
              <div className="products__descr">
                <h3 className="products__title">{product.title}</h3>
                <p>{product.category}</p>
              </div>
              <p className="products__price">{product.price} kr.-</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
