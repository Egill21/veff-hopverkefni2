import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import { IProducts, ICategory } from '../../api/types';
import { getPagedProducts, getCategory } from '../../api/index';

import Products from '../../components/products/Products';

import './Category.scss';

export default function Category(props: any) {
  const { match } = props;
  const { id } = match.params;
  const categoryID = parseInt(id);

  const [products, setProducts] = useState<IProducts | null>(null);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [page, setPage] = useState<number>(1);
  const [inputBox, setInputBox] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const myProducts: IProducts | null = await getPagedProducts(categoryID);
    const myCategory: ICategory | null = await getCategory(categoryID);
    setProducts(myProducts);
    setCategory(myCategory);
    setLoading(false);
  }

  async function fetchNewData(slug: string, pageChange: number) {
    setLoading(true);
    const newProducts: IProducts | null = await getPagedProducts(categoryID, slug);
    setPage(page + pageChange);
    setProducts(newProducts);
    setLoading(false);
  }

  async function searchData(slug: string) {
    setLoading(true);
    setSearchInput(inputBox);
    const newProducts: IProducts | null = await getPagedProducts(categoryID, `${slug}&search=${inputBox}`);
    setProducts(newProducts);
    setLoading(false);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputBox(e.target.value);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="category">
      {products && (
        <Fragment>
          {category && 
            <Fragment>
              <Helmet title={category.title} />
              <h2 className="category__heading">{category.title}</h2>
            </Fragment>
          }
          <div className="category__searchContainer">
            <label className="category__searchlabel" >Leita:</label>
            <input onChange={onChange} className="category__searchInput" type="text"></input>
            <button onClick={() => searchData(products._links.self.href)} className="category__searchButton" >Leita</button>
          </div>
          <Products productList={products.items} />
          <div className="category__pages">
            {products._links.prev && 
              <button
                onClick={() => fetchNewData(`${products._links.prev.href}&search=${searchInput}`, -1)} 
                className="category__pageButton">
                Fyrri síða
              </button>
            }
            <p className="category__currentPage" >Síða {page}</p>
            {products._links.next &&
              <button
                onClick={() => fetchNewData(`${products._links.next.href}&search=${searchInput}`, 1)}
                className="category__pageButton">
                Næsta síða
              </button>
            }
          </div>
        </Fragment>
      )}
    </div>
  );
}
