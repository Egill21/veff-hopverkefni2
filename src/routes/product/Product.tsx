import React, { Fragment, useState, useEffect } from 'react';

import { IProduct } from '../../api/types';
import { getProduct, getMoreProducts } from '../../api/index';

import './Product.scss';

import SingleProduct from '../../components/product/Product';
import Products from '../../components/products/Products';

export default function Product(props: any) {

  const { match } = props;
  const { id } = match.params;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<Array<IProduct> | null>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const myProduct: IProduct = await getProduct(id);
    const myProducts: IProduct[] | null = await getMoreProducts(myProduct.category_id);
    setProduct(myProduct);
    setProducts(myProducts);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {loading &&
        <p>Hleð gögnum...</p>
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
