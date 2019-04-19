import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import Userorders from '../../components/userorders/Userorders';
import { Context } from '../../User';
import Error from '../system-pages/Error';

export default function Orders() {
  return (
    <Context.Consumer>
      {({ token }) => {
        if (!token) {
          const error: string =
            'Til þess að skoða pantanir þarf að skrá sig inn';
          return <Error type="No Access" errorMSG={error} />;
        } else {
          return (
            <Fragment>
              <Helmet title="Pantanir" />
              <Userorders token={token} />
            </Fragment>
          );
        }
      }}
    </Context.Consumer>
  );
}
