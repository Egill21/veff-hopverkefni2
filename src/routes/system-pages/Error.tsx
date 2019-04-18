import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import './SystemPages.scss';

export default function Error(props: {type: string, errorMSG: string}) {

  const { type, errorMSG } = props;

  return (
    <Fragment>
      <Helmet title={type} />
      <div className="system-page">
        <h2>{errorMSG}</h2>
        <p><Link to="/">Aftur heim</Link></p>
      </div>
    </Fragment>
  )
}
