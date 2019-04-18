import React, { useState, Fragment } from 'react';

import { IProduct } from '../../api/types';
import { addToCart } from '../../api/index'
import { Context } from '../../User';

import './Product.scss';

export default function SingleProduct(props: { product: IProduct }) {
  const { product } = props;

  const [input, setInput] = useState<number | string>(1);
  const [added, setAdded] = useState<boolean>(false);


  function updateQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = parseInt(e.target.value);
    const value = isNaN(inputValue) ? '' : inputValue;
    if (typeof value === 'number' && value < 1) {
      setInput(1);
    } else {
      setInput(value);
    }
  }

  async function addItem(quantity: number | string, token: string | null): Promise<void> {
    if (typeof quantity === 'number') {
      await addToCart(product.id, quantity, token);
      setAdded(true);
    }
  }

  const desc = product.description;
  const textArr = desc ? desc.split('\n') : [];
  const descElement = textArr.map((paragraph, i) => {
    return (
      <p key={i} className="product__description">
        {paragraph}
      </p>
    );
  });

  return (
    <Context.Consumer>
      {({ user, token }) => {
        return (
          <Fragment>
            <div className="product__col">
              <img className="product__image" src={product.image} />
            </div>
            <div className="product__col">
              <div>
                <h2 className="product__title">{product.title}</h2>
                <div className="product__description">
                  <p>
                    Flokkur: {product.category_title} <br />
                    Verð: {`${product.price} kr-`}
                  </p>
                </div>
                {descElement}
                {user &&
                  <div className="product__loggedinContainer">
                    <label className="product__loggedinLabel">Fjöldi</label>
                    <input onChange={updateQuantity} value={input} className="product__loggedinInput" type="number" ></input>
                    <button onClick={() => addItem(input, token)} className="product__loggedinButton">Bæta við körfu</button>
                    {added && <p>Bætt við körfu!</p>}
                  </div>
                }
              </div>
            </div>
          </Fragment>
        )
      }}
    </Context.Consumer>

  );
}
