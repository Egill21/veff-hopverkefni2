import React, { Fragment, useEffect, useState } from "react";
import Helmet from "react-helmet";

import { getMoreProducts, getProduct } from "../../api/index";
import { IProduct } from "../../api/types";

import "./Product.scss";

import SingleProduct from "../../components/product/Product";
import Products from "../../components/products/Products";
import Error from "../../routes/system-pages/Error";

export default function Product(props: any) {

  const { match } = props;
  const { id } = match.params;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<Array<IProduct> | null>([]); // tslint:disable-line
  const [isNotFound, setisNotFound] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData(productID?: number) {
    setLoading(true);
    console.log('fetching');
    let data:any;
    if (productID) {
      data = await getProduct(productID);
    } else {
      data = await getProduct(id);
    }

    if (data === "Not Found") {
      setisNotFound(true);
    } else if (data === "Error") {
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
    const error: string = "Vara fannst ekki";
    return <Error type="Not Found" errorMSG={error} />;
  }

  if (isError) {
    const error: string = "Eitthvað fór úrskeiðis";
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
              <Helmet title={product.title} />
              <div className="product__row">
                <SingleProduct product={product} />
              </div>
              <h2 className="product__heading">Meira úr {product.category_title}</h2>
            </Fragment>
          }
          <div className="product__row">
            {products && <Products productList={products} onClick={fetchData} />}
          </div>
        </Fragment>
      }
    </Fragment>
  );
}
