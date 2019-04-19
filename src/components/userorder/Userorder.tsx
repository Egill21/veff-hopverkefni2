import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrder } from "../../api/index";
import { ICart } from "../../api/types";

import Error from "../../routes/system-pages/Error";

import "./Userorder.scss";

export default function Userorder(props: { token: string, id: string }) {

  const { token, id } = props;

  const [order, setOrder] = useState<ICart | null>(null);
  const [isNotFound, setisNotFound] = useState<boolean>(false);
  const [isNoAccess, setIsNoAccess] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const data: any = await getOrder(token, id);

    if (data === "Not Found") {
      setisNotFound(true);
    }

    if (data === "No Access") {
      setIsNoAccess(true);
    }

    if (data === "Error") {
      setError(true);
    }

    setOrder(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isNotFound) {
    const error: string = "Pöntun fannst ekki";
    return <Error type="Not Found" errorMSG={error} />;
  }

  if (isNoAccess) {
    const error: string = "Þú hefur ekki aðgang að þessari síðu";
    return <Error type="No Access" errorMSG={error} />;
  }

  if (isError) {
    const error: string = "Eitthvað fór úrskeiðis";
    return <Error type="Error" errorMSG={error} />;
  }

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
                  <div className="userorder__userinfo--data">
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
