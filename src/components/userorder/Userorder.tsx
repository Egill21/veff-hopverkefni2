import React, { Fragment, useState, useEffect } from 'react';

import { ICart } from '../../api/types';
import { getOrder } from '../../api/index';

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
            <Fragment>
              <h2>Pöntun #{order.id}</h2>
            </Fragment>
          }
        </Fragment>
      }
      {loading &&
        <p>Hleð gögnum...</p>
      }
    </Fragment>
  );
}
