import React from 'react';

import AddToCart from '../../components/cart/Cart';
import NoAccess from '../system-pages/NoAccess';

import './Cart.scss';

import { Context } from '../../User';

export default function Cart() {
  return (
    <Context.Consumer>
      {({ token }) => {
        if (!token) {
          return ( <NoAccess /> );
        } else {
          return (
            <div className="cart__row">
              <AddToCart token={token} />
            </div>
          );
        }
      }}
    </Context.Consumer>
  );
}
