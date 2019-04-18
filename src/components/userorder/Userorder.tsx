import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ICart } from '../../api/types';
import { getOrder } from '../../api/index';

import './Userorder.scss';

export default function Userorder(props: { token: string, id: string }) {

  const { token, id } = props;

  const [order, setOrder] = useState<ICart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const data = await getOrder(token, id);
    setOrder(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {!loading &&
        <Fragment>
          {order &&
            <div className="userorder__row">
              <div className="userorder__col">
                <h1 className="userorder__heading">Pöntun #{order.id}</h1>
                <div className="userorder__userinfo">
                  <div className="userorder__userinfo--label">
                    <label>Nafn</label>
                    <label>Heimilisfang</label>
                    <label>Búin til</label>
                  </div>
                  <div>
                    <p>{order.name}</p>
                    <p>{order.address}</p>
                    <p>{order.created}</p>
                  </div>
                </div>
                <table className="userorder__table">
                  <tbody>
                    <tr>
                      <th>Vara</th>
                      <th>Verð</th>
                      <th>Fjöldi</th>
                      <th>Samtals</th>
                    </tr>
                    {order.lines.map((line, i) => {
                      return (
                        <tr key={i}>
                          <td><Link to={`/product/${line.product_id}`}>{line.title}</Link></td>
                          <td>{line.price} kr.-</td>
                          <td>{line.quantity}</td>
                          <td>{line.total}</td>
                        </tr>
                      )
                    })}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{order.total} kr.-</td>
                    </tr>
                  </tbody>
                </table>
                <p className="userorder__backlink" ><Link to="/orders">Aftur í pantanir</Link></p>
              </div>
            </div>
          }
        </Fragment>
      }
      {loading &&
        <p>Hleð gögnum...</p>
      }
    </Fragment>
  );
}
