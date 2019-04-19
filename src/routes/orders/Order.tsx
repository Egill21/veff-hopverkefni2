import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import { Context } from '../../User';

import Userorder from '../../components/userorder/Userorder';
import Error from '../system-pages/Error';

export default function Order(props: any) {
  const { match } = props;
  const { id } = match.params;

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
              <Helmet title={`Pöntun ${id}`} />
              <Userorder token={token} id={id} />
            </Fragment>
          );
        }
      }}
    </Context.Consumer>
  );
}
