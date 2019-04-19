import React from "react";

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
            <Userorders token={token} />
          );
        }
      }}
    </Context.Consumer>
  );
}
