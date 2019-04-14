import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import Products from '../../components/products/Products';

import './Home.scss';

export default function Home() {

  return (
    <Fragment>
      <Helmet title="Forsíða" />
      <Products />
    </Fragment>
  );
}