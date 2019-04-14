import React, { Fragment } from 'react';

import './Products.scss';

import { getProduct } from '../../api/index';

export default function Products() {

  async function stuffystuff() {
    const products: object = await getProduct(1);
    //console.log(products.title);
    return products;
  }

  const product: object = stuffystuff();
  console.log(product);

  return (
    <Fragment>
      <div className="products__container">
        <div className="products__content">
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
      </div>
    </Fragment>
  );
}
