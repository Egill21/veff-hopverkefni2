import React, { useState, Fragment } from 'react';

import { IProduct } from '../../api/types';
import { addToCart } from '../../api/index'
import { Context } from '../../User';

import './Product.scss';

export default function SingleProduct(props: { product: IProduct }) {
  const { product } = props;

  const [input, setInput] = useState<number>(0)
  const [added, setAdded] = useState<boolean>(false);

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(parseInt(e.target.value));
  }

  async function addItem(quantity: number, token: string | null): Promise<void> {
    await addToCart(product.id, quantity, token);
    setAdded(true);
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
                    <input onChange={changeInput} className="product__loggedinInput" type="number" ></input>
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
