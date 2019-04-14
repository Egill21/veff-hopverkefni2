import React, { Fragment } from 'react';
import { IProduct } from '../../api/types';

import './Products.scss';

export default function Products(props: { productList: IProduct[] }) {

  const { productList } = props;

  return (
    <div className="products__container">
      {productList.map((product, i) => {
        return (
          <div key={i} className="products__product">
            {/* <div className="products__box">
              hallo
            </div> */}
            <img className="products__box" src={product.image}></img>
            <div className="products__info">
              <div className="products__descr">
                <h3 className="products__title">{product.title}</h3>
                <p>{product.category}</p>
              </div>
              <p className="products__price">{product.price} kr.-</p>
            </div>
          </div>
        )
      })}
    </div>
  );


/*   return (
    <Fragment>
      <div className="products__container">
        <div className="products__product">
          <div className="products__box">
            hallo
          </div>
          <div className="products__info">
            <div className="products__descr">
              <h3 className="products__title">Ergonomic Rubber Bacon</h3>
              <p>Sports</p>
            </div>
            <p className="products__price">635 kr.-</p>
          </div>
        </div>

        <div className="products__product">
          <div className="products__box">
            hallo
          </div>
          <div className="products__info">
            <div className="products__descr">
              <h3 className="products__title">Ergonomic Rubber Bacon</h3>
              <p>Sports</p>
            </div>
            <p className="products__price">635 kr.-</p>
          </div>
        </div>

        <div className="products__product">
          <div className="products__box">
            hallo
          </div>
          <div className="products__info">
            <div className="products__descr">
              <h3 className="products__title">Ergonomic Rubber Bacon</h3>
              <p>Sports</p>
            </div>
            <p className="products__price">635 kr.-</p>
          </div>
        </div>

        <div className="products__product">
          <div className="products__box">
            hallo
          </div>
          <div className="products__info">
            <div className="products__descr">
              <h3 className="products__title">Ergonomic Rubber Bacon</h3>
              <p>Sports</p>
            </div>
            <p className="products__price">635 kr.-</p>
          </div>
        </div>

        <div className="products__product">
          <div className="products__box">
            hallo
          </div>
          <div className="products__info">
            <div className="products__descr">
              <h3 className="products__title">Ergonomic Rubber Bacon</h3>
              <p>Sports</p>
            </div>
            <p className="products__price">635 kr.-</p>
          </div>
        </div>
      </div>
    </Fragment>
  ); */


}
