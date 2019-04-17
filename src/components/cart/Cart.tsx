import React, { useState, useEffect, Fragment } from 'react';

import Input from '../input/Input';
import Button from '../button/Button';
import Cartline from '../cartline/Cartline';
import { getCart, deleteFromCart } from '../../api/index';
import { ICart } from '../../api/types';
import './Cart.scss';

export default function Cart(props: { token: string | null }) {
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

  async function updateLine(lineID: number, quantity: number, token: string) {
    setLoading(true);
    const results = await deleteFromCart(lineID, quantity, token);
    await fetchData();
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {cart &&
        cart.lines.map((cartline, i) => {
          return (
            <Cartline key={i} line={cartline} />
          );
        })}
      <div className="cart__input">
        <h2>Senda inn pöntun</h2>
        <Input text="Nafn:" type="text" name="name" />
        <Input text="Heimilisfang:" type="text" name="address" />
      </div>
      <Button className="cart__button">Senda inn pöntun</Button>
    </Fragment>
  );
}
