import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import './Error.scss';

export default function Error(props: {type: string, errorMSG: string}) {

  const { type, errorMSG } = props;

  return (
    <Fragment>
      <Helmet title={type} />
        <div className="error">
          <h2>{errorMSG}</h2>
          <Link to="/"><p>Aftur heim</p></Link>
        </div>
    </Fragment>
  )
}
