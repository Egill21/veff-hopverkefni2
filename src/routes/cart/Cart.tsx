import React from 'react';

import AddToCart from '../../components/cart/AddToCart';

import './Cart.scss';

import { Context } from '../../User';

export default function Cart() {
  return (
    <Context.Consumer>
      {({ token }) => {
        return (
          <div className="cart">
            <AddToCart token={token} />
          </div>
        );
      }}
    </Context.Consumer>
  );
}
