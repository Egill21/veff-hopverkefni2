import React, { Fragment, useState, useEffect } from 'react';

import { IProduct } from '../../api/types';
import { getProduct, getMoreProducts } from '../../api/index';

import './Product.scss';

import SingleProduct from '../../components/product/Product';
import Products from '../../components/products/Products';
import Error from '../../routes/system-pages/Error';

export default function Product(props: any) {

  const { match } = props;
  const { id } = match.params;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<Array<IProduct> | null>([]);
  const [isNotFound, setisNotFound] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const data: any = await getProduct(id);

    if (data === 'Not Found') {
      setisNotFound(true);
    } else if (data === 'Error') {
      setError(true);
    } else {
      const myProducts: IProduct[] | null = await getMoreProducts(data.category_id);
      setProduct(data);
      setProducts(myProducts);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isNotFound) {
    const error: string = 'Vara fannst ekki';
    return <Error type="Not Found" errorMSG={error} />;
  }

  if (isError) {
    const error: string = 'Eitthvað fór úrskeiðis';
    return <Error type="Error" errorMSG={error} />;
  }

  return (
    <Fragment>
      {loading &&
        <div className="product__row">
          <div className="product__col">
            <h2 className="product__heading">Sæki vöru...</h2>
          </div>
        </div>
      }
      {!loading &&
        <Fragment>
          {product &&
            <Fragment>
              <div className="product__row">
                <SingleProduct product={product} />
              </div>
              <h2 className="product__heading">Meira úr {product.category_title}</h2>
            </Fragment>
          }
          <div className="product__row">
            {products && <Products productList={products} />}
          </div>
        </Fragment>
      }
    </Fragment>
  );
}
