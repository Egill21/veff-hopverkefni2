import React, { Fragment, useEffect, useState } from "react";
import Helmet from "react-helmet";

import { getCategory, getPagedProducts } from "../../api/index";
import { ICategory, IProducts } from "../../api/types";

import Error from "../../routes/system-pages/Error";

import Products from "../../components/products/Products";

import "./Category.scss";

export default function Category(props: any) {
  const { match } = props;
  const { id } = match.params;

  const categoryID = parseInt(id); // tslint:disable-line

  const [products, setProducts] = useState<IProducts | null>(null);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [page, setPage] = useState<number>(1);
  const [inputBox, setInputBox] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isNotFound, setisNotFound] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const myCategory: any = await getCategory(categoryID);

    if (myCategory === "Not Found") {
      setisNotFound(true);
    } else if (myCategory === "Error") {
      setError(true);
    } else {
      setCategory(myCategory);
      const myProducts: IProducts | null = await getPagedProducts({categoryID});
      setProducts(myProducts);
    }
    setLoading(false);
  }

  async function fetchNewData(slug: string, pageChange: number) {
    setLoading(true);
    const newProducts: IProducts | null = await getPagedProducts({
      categoryID,
      slug,
    });
    setPage(page + pageChange);
    setProducts(newProducts);
    setLoading(false);
  }

  async function searchData() {
    setLoading(true);
    setSearchInput(inputBox);
    const newProducts: IProducts | null = await getPagedProducts({
      categoryID,
      searchslug : inputBox,
    });
    setProducts(newProducts);
    setPage(1);
    setLoading(false);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputBox(e.target.value);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isNotFound) {
    const error: string = "Flokkur fannst ekki";
    return <Error type="Not Found" errorMSG={error} />;
  }

  if (isError) {
    const error: string = "Eitthvað fór úrskeiðis";
    return <Error type="Error" errorMSG={error} />;
  }

  return (
    <div className="category">
      {!loading &&
        <Fragment>
          {products && (
            <Fragment>
              {category && (
                <Fragment>
                  <Helmet title={category.title} />
                  <h2 className="category__heading">{category.title}</h2>
                </Fragment>
              )}
              <div className="category__searchContainer">
                <label className="category__searchlabel">Leita:</label>
                <input
                  onChange={onChange}
                  className="category__searchInput"
                  type="text"
                />
                <button
                  onClick={searchData}
                  className="category__searchButton"
                >
                  Leita
                </button>
              </div>
              <div className="category__row">
                <Products productList={products.items} />
              </div>
              <div className="category__pages">
                {products._links.prev && (
                  <button
                    onClick={() =>
                      fetchNewData(
                        `${products._links.prev.href}&search=${searchInput}`,
                        -1,
                      )
                    }
                    className="category__pageButton"
                  >
                    Fyrri síða
                  </button>
                )}
                <p className="category__currentPage">Síða {page}</p>
                {products._links.next && (
                  <button
                    onClick={() =>
                      fetchNewData(
                        `${products._links.next.href}&search=${searchInput}`,
                        1,
                      )
                    }
                    className="category__pageButton"
                  >
                    Næsta síða
                  </button>
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      }
      {loading &&
        <h2 className="category__heading">Sæki vörur...</h2>
      }
    </div>
  );
}
