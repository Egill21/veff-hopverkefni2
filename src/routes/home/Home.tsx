import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import Products from '../../components/products/Products';
import Button from './../../components/button/Button';

import './Home.scss';

export default function Home() {

  function hallo() {
    console.log('hvað á að gerast hér?');
  }

  return (
    <Fragment>
      <div className="home">
        <Helmet title="Forsíða" />
        <h2 className="home__heading">Nýjar vörur</h2>
        <Products />
        <Button onClick={hallo} className="home__button">Skoða alla flokka</Button>
        <h3 className="home__subheading">Skoðaðu vöruflokkana okkar</h3>
        <div className="home__categories">
          <div className="home__category">
            <p className="category">Clothing</p>
          </div>
          <div className="home__category">
            <p className="category">Shoes</p>
          </div>
          <div className="home__category">
            <p className="category">Garden</p>
          </div>
          <div className="home__category">
            <p className="category">Computers</p>
          </div>
          <div className="home__category">
            <p className="category">Movies</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}