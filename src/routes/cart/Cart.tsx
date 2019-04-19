import React, { Fragment } from "react";
import Helmet from "react-helmet";

import AddToCart from "../../components/cart/Cart";
import Error from "../system-pages/Error";

import "./Cart.scss";

import { Context } from "../../User";

export default function Cart() {
  return (
    <Context.Consumer>
      {({ token }) => {
        if (!token) {
          const error: string = "Til þess að skoða körfu þarf að skrá sig inn";
          return (<Error type="No Access" errorMSG={error} />);
        } else {
          return (
            <Fragment>
              <Helmet title="Karfa" />
              <div className="cart__row">
                <AddToCart token={token} />
              </div>
            </Fragment>
          );
        }
      }}
    </Context.Consumer>
  );
}
