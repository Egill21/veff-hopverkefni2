import React from 'react';

import AddToCart from '../../components/cart/AddToCart';

import './Cart.scss';

export default function Cart() {
  return (
    <div className="cart">
      <AddToCart />
    </div>
  );
}