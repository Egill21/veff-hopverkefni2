import React from "react";

import { Context } from "../../User";

import Userorder from "../../components/userorder/Userorder";
import NoAccess from "../system-pages/NoAccess";

export default function Order(props: any) {

  const { match } = props;
  const { id } = match.params;

  return (
    <Context.Consumer>
      {({ token }) => { // tslint:disable-line
        if (!token) {
          return (<NoAccess />);
        } else {
          return (<Userorder token={token} id={id} />);
        }
      }}
    </Context.Consumer>
  );
}
