import React, { useState, useEffect, Fragment } from 'react';

import Input from '../input/Input';
import Button from '../button/Button';
import Cartline from '../cartline/Cartline';
import { getCart, deleteFromCart, updateCart, createOrder } from '../../api/index';
import { ICart } from '../../api/types';
import './Cart.scss';

export default function Cart(props: { token: string | null }) {
  const { token } = props;

  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<ICart | null>(null);
  const [orderSent, setOrderSent] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  async function fetchData() {
    setLoading(true);
    if (token !== null) {
      const data: ICart = await getCart(token);
      setCart(data);
      console.log(data);
    }
    setLoading(false);
  }

  async function deleteLine(lineID: number, token: string) {
    setLoading(true);
    await deleteFromCart(lineID, token);
    await fetchData();
    setLoading(false);
  }

  async function updateLine(lineID: number, quantity: number, token: string) {
    setLoading(true);
    const response = await updateCart(lineID, quantity, token);
    await fetchData();
    setLoading(false);
  }

  async function order() {
    setLoading(true);
    await createOrder(name, address, token);
    setOrderSent(true);
    setLoading(false);
  }

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
		console.log("TCL: onNameChange -> e.target.value", e.target.value)
  }

  function onAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
		console.log("TCL: onAddressChange -> e.target.value", e.target.value)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {loading && 
        <p>Hleð gögnum...</p>
      }
      {!loading && 
        <Fragment>
          {orderSent &&
            <p>Pöntun hefur verið send!</p>
          }
          {!orderSent &&
            <Fragment>
              {cart &&
                cart.lines.map((cartline, i) => {
                  return (
                    <Cartline key={i} line={cartline} token={token} deleteLine={deleteLine} updateLine={updateLine} />
                  );
                })}
              <div className="cart__input">
                <h2>Senda inn pöntun</h2>
                <Input onChange={onNameChange} text="Nafn:" type="text" name="name" />
                <Input onChange={onAddressChange} text="Heimilisfang:" type="text" name="address" />
              </div>
              <Button onClick={order} className="cart__button">Senda inn pöntun</Button>
            </Fragment>
          }
        </Fragment>
      }


    </Fragment>
  );
}
