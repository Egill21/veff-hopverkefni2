import React, { useState, useEffect, Fragment } from 'react';

import Input from '../input/Input';
import Button from '../button/Button';
import { getCart, deleteFromCart } from '../../api/index';
import { ICart, ICartline } from '../../api/types';
import './Cartline.scss';

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
    <div className="cartline__product">
      <div className="cartline__imgcont">
        <img className="cartline__image" src={line.image} />
      </div>
      <div className="cartline__info">
        <div>
          <h2 className="cartline__title">{line.title}</h2>
          <p>{`Verð: ${line.price} kr.-`}</p>
        </div>
        <div className="cartline__info--right">
          <div className="cartline__quantity">
            <p>Fjöldi:</p>
            <input
              type="number"
              className="cartline__quantity--input"
              value={quantity}
              onChange={updateQuantity}
            />
            <Button onClick={() => updateLine(line.id, quantity, token)} className="cartline__update" children="Uppfæra" />
          </div>
          <p className="cartline__amount">{`Samtals: ${
            line.total
            } kr.-`}</p>
          <Button onClick={() => deleteLine(line.id, token)} className="cartline__delete" children="Eyða línu" />
        </div>
      </div>
    </div>
  );
}
