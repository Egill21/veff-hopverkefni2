import React, { useState, useEffect } from 'react';

import Button from './../../components/button/Button';
import { getCart } from '../../api/index';
import { ICart } from '../../api/types';
import './AddToCart.scss';
import img1 from './img1.jpg';

export default function AddToCart(props: { token: string | null }) {
  const { token } = props;

  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<ICart | null>(null);

  async function fetchData() {
    setLoading(true);
    if (token !== null) {
      const data: ICart = await getCart(token);
      setCart(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="cart__container">
      <div className="cart__product">
        <img className="cart__image" src={img1} alt="hallo" />

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
