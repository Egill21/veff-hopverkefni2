import React, { useState, useEffect } from 'react';

import Input from './../../components/input/Input';
import Button from './../../components/button/Button';
import { getCart } from '../../api/index';
import { ICart } from '../../api/types';
import './AddToCart.scss';

export default function AddToCart(props: { token: string | null }) {
  const { token } = props;

  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<ICart | null>(null);

  async function fetchData() {
    setLoading(true);
    if (token !== null) {
      const data: ICart = await getCart(token);
      setCart(data);
      console.log(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="cart__col">
      {cart &&
        cart.lines.map((cartline, i) => {
          return (
            <div className="cart__product" key={i}>
              <img className="cart__image" src={cartline.image} />
              <div className="cart__info">
                <div className="cart__info--left">
                  <h2 className="cart__title">{cartline.title}</h2>
                  <p>{`Verð: ${cartline.price} kr.-`}</p>
                </div>
                <div className="cart__info--right">
                  <div className="cart__quantity">
                    <p>Fjöldi:</p>
                    <input type="number" className="cart__quantity--input" required />
                    <Button className="cart__update" children="Uppfæra" />
                  </div>
                  <p className="cart__amount">{`Samtals: ${cartline.total} kr.-`}</p>
                  <Button className="cart__delete" children="Eyða línu" />
                </div>
              </div>
            </div>
          );
        })
      }
      <div className="cart__input">
        <h2>Senda inn pöntun</h2>
        <Input
          text="Nafn:"
          type="text"
          name="name"
        />
        <Input
          text="Heimilisfang:"
          type="text"
          name="address"
        />
      </div>
      <Button className="cart__button">
        Senda inn pöntun
      </Button>
    </div>
  );
}
