import React, { Fragment } from "react";
import Helmet from "react-helmet";

import Userorders from "../../components/userorders/Userorders";
import { Context } from "../../User";
import NoAccess from "../system-pages/NoAccess";

export default function Orders() {

  return (
    <Context.Consumer>
      {({ token }) => {
        if (!token) {
          return (
            <NoAccess />
          );
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
