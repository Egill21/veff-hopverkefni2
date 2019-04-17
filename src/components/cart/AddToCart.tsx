import React from 'react';

import Button from './../../components/button/Button';

import './AddToCart.scss';
import img1 from './img1.jpg';

export default function AddToCart() {
  return (
    <div className="cart__container">
      <div className="cart__product">

        <img className="cart__image" src="" alt="hallo" />

        <div className="cart__info">
          <div className="cart__info--left">
            <h2 className="cart__title">Incredible Granite Table</h2>
            <p>Verð: 128 kr.-</p>
          </div>

          <div className="cart__info--right">
            <div className="cart__quantity">
              <p>Fjöldi:</p>
              <input type="text" className="cart__quantity--input" required />
              <Button className="cart__update" children="Uppfæra" />
            </div>
            <p className="cart__amount">Samtals: 125 kr.-</p>
            <Button className="cart__delete" children="Eyða línu" />
          </div>
        </div>

      </div>
    </div>
  );
}