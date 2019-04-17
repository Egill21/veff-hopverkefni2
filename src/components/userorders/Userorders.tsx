import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Userorders.scss';

import { getOrders } from '../../api/index';
import { IOrders } from '../../api/types';

export default function Userorders(props: { token: string }) {

  const { token } = props;

  const [orders, setOrders] = useState<IOrders | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const data = await getOrders(token);
    console.log(data);
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <h2>Þínar pantanir</h2>
      {loading &&
        <p>Hleð gögnum...</p>
      }
      {!loading &&
        <Fragment>
          {orders &&
            <table>
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
          }
        </Fragment>
      }
    </Fragment>
  )
}