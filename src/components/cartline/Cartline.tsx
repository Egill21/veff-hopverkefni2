import React, { useState, useEffect } from 'react';

import Input from '../input/Input';
import Button from '../button/Button';
import { getCart, deleteFromCart } from '../../api/index';
import { ICart, ICartline } from '../../api/types';
import '../cart/Cart.scss';

export default function Cartline(props: { line: ICartline, token: string | null, deleteLine: any, updateLine: any }) {

  const { line, token, deleteLine, updateLine } = props;

  const [quantity, setQuantity] = useState<number | string>(line.quantity);

  function updateQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    const input = parseInt(e.target.value);
    const value = isNaN(input) ? '' : input;
    if (typeof value === 'number' && value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  }

  return (
    <div className="cart__col">
    <div className="cart__product">
      <img className="cart__image" src={line.image} />
      <div className="cart__info">
        <div className="cart__info--left">
          <h2 className="cart__title">{line.title}</h2>
          <p>{`Verð: ${line.price} kr.-`}</p>
        </div>
        <div className="cart__info--right">
          <div className="cart__quantity">
            <p>Fjöldi:</p>
            <input
              type="number"
              className="cart__quantity--input"
              value={quantity}
              onChange={updateQuantity}
            />
            <Button onClick={() => updateLine(line.id, quantity, token)} className="cart__update" children="Uppfæra" />
          </div>
          <p className="cart__amount">{`Samtals: ${
            line.total
          } kr.-`}</p>
          <Button onClick={() => deleteLine(line.id, token)} className="cart__delete" children="Eyða línu" />
        </div>
      </div>
    </div>
  </div>
  );
}
