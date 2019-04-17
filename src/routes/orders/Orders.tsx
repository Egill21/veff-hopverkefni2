import React from 'react';

import { Context } from '../../User';
import Userorders from '../../components/userorders/Userorders';
import NoAccess from '../system-pages/NoAccess';

export default function Orders() {

  return (
    <Context.Consumer>
      {({ token }) => {
        if (!token) {
          return (
            <NoAccess />
          )
        } else {
          return (
            <Userorders token={token} />
          )
        }
      }}
    </Context.Consumer>
  )
}
