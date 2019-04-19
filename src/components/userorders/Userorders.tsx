import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Userorders.scss";

import { getOrders } from "../../api/index";
import { IOrders } from "../../api/types";

export default function Userorders(props: { token: string }) {

  const { token } = props;

  const [isNotFound, setisNotFound] = useState<boolean>(false);
  const [orders, setOrders] = useState<IOrders | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const data = await getOrders(token);

    if (data.items.length > 0) {
      setOrders(data);
    } else {
      setisNotFound(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isNotFound) {
    const message: string = "Engin pöntun fannst";
    return (
      <div className="userorders__col">
        <h2 className="userorders__notfound">{message}</h2>
      </div>
    );
  }

  return (
    <div className="userorders__row">
      {loading &&
        <div className="userorders__col">
          <h2>Hleð gögnum...</h2>
        </div>
      }
      {!loading &&
        <Fragment>
          {orders &&
            <div className="userorders__col">
              <h1 className="userorders__title">Þínar pantanir</h1>
              <table className="userorders__table">
                <tbody>
                  <tr>
                    <th>Pöntun</th>
                    <th>Nafn</th>
                    <th>Heimilisfang</th>
                    <th>Búin til</th>
                  </tr>
                  {orders.items.map((order, i) => {
                    return (
                      <tr key={i}>
                        <td><Link to={`/orders/${order.id}`}>Pöntun #{order.id}</Link></td>
                        <td>{order.name}</td>
                        <td>{order.address}</td>
                        <td>{order.created}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          }
        </Fragment>
      }
    </div>
  );
}
