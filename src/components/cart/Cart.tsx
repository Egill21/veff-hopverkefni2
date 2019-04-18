import React, { useState, useEffect, Fragment } from 'react';

import Input from '../input/Input';
import Button from '../button/Button';
import Cartline from '../cartline/Cartline';
import Error from '../../routes/system-pages/Error';

import { getCart, deleteFromCart, updateCart, createOrder } from '../../api/index';
import { ICart } from '../../api/types';
import './Cart.scss';

export default function Cart(props: { token: string }) {
  const { token } = props;

  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<ICart | null>(null);
  const [isNotFound, setisNotFound] = useState<boolean>(false);
  const [isNoAccess, setIsNoAccess] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [errorMSG, setErrorMSG] = useState<any>(null);
  const [orderSent, setOrderSent] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  async function fetchData() {
    setLoading(true);

    const data: any = await getCart(token);

    if (data === 'Not Found') {
      setisNotFound(true);
    } else if (data === 'No Access') {
      setIsNoAccess(true);
    } else if (data === 'Error') {
      setError(true);
    } else {
      if (data.lines.length > 0) {
        setCart(data);
      } else {
        setisNotFound(true);
      }
    }
    

    setLoading(false);
  }

  async function deleteLine(lineID: number, token: string) {
    setLoading(true);
    await deleteFromCart(lineID, token);
    await fetchData();
    setLoading(false);
  }

  async function updateLine(lineID: number, quantity: number, token: string) {
    setLoading(true);
    await updateCart(lineID, quantity, token);
    await fetchData();
    setLoading(false);
  }

  async function order() {
    setLoading(true);
    const response = await createOrder(name, address, token);

    if (response === 'No Access') {
      setOrderSent(true);
    } else if (response === 'No Access') {
      setIsNoAccess(true);
    } else if (response === 'Not Found') {
      setisNotFound(true);
    } else {
      setErrorMSG(response);
    }

    setLoading(false);
  }

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    console.log("TCL: onNameChange -> e.target.value", e.target.value)
  }

  function onAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
    console.log("TCL: onAddressChange -> e.target.value", e.target.value)
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isNotFound) {
    const message: string = 'Engin karfa fannst';
    return (
      <div className="cart__col">
        <h2 className="cart__nocart" >{message}</h2>
      </div>
    );
  }

  if (isNoAccess) {
    const error: string = 'Þú verður að vera skráður inn til að skoða körfu';
    return <Error type="No Access" errorMSG={error} />;
  }

  if (isError) {
    const error: string = 'Eitthvað fór úrskeiðis';
    return <Error type="Error" errorMSG={error} />;
  }

  return (
    <Fragment>
      {loading &&
        <div className="cart__col">
          <h2 className="cart__nocart">Hinkraðu augnablik...</h2>
        </div>
      }
      {!loading &&
        <Fragment>
          {orderSent &&
            <p>Pöntun hefur verið send!</p>
          }
          {!orderSent &&
            <Fragment>
              {cart &&
                <Fragment>
                  {cart.lines &&
                    <Fragment>
                      {cart.lines.map((cartline: any, i: any) => {
                        return (
                          <Cartline key={i} line={cartline} token={token} deleteLine={deleteLine} updateLine={updateLine} />
                        );
                      })}
                      <div className="cart__col">
                        <div className="cart__input">
                          <h2 className="cart__title">Senda inn pöntun</h2>
                          {errorMSG &&
                            errorMSG.errors.map((error: any, i: any) => {
                              return ( <p key={i} >{`${error.field}, ${error.error}`}</p> );
                            })
                          }
                          <Input onChange={onNameChange} text="Nafn:" type="text" name="name" />
                          <Input onChange={onAddressChange} text="Heimilisfang:" type="text" name="address" />
                          <Button onClick={order} className="cart__button">Senda inn pöntun</Button>
                        </div>
                      </div>
                    </Fragment>
                  }
                </Fragment>
              }
            </Fragment>
          }
        </Fragment>
      }
    </Fragment>
  );
}
