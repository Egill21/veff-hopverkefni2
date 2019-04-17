import React from 'react';
import { IProduct } from '../../api/types';
import { Link } from 'react-router-dom';

import './Products.scss';

export default function Products(props: { productList: IProduct[] }) {
  const { productList } = props;
  return (

    < div className="products__container" >
      {
        productList.map((product, i) => {
          return (
            <Link className="products__link" key={i} to={`/product/${product.id}`}>
              <div className="products__product">
                <img className="products__image" src={product.image} />
                <div className="products__info">
                  <div className="products__descr">
                    <h3 className="products__title">{product.title}</h3>
                    <p>{product.category_title}</p>
                  </div>
                  <p className="products__price">{product.price} kr.-</p>
                </div>
              </div>
            </Link>
          );
        })
      }
    </div >

  );
}
