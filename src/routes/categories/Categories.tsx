import React, { Fragment, useState, useEffect } from 'react';

import { ICategory } from '../../api/types';

import Categories from '../../components/categories/Categories';

import { getCategories } from '../../api/index';

import '../../components/categories/Categories.scss';

export default function CategoriesRoute() {

  const [categories, setCategories] = useState<Array<ICategory> | null>([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const myCategories: ICategory[] | null = await getCategories();
    setCategories(myCategories);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {loading &&
        <h2 className="loading">Sæki flokka...</h2>
      }
      {!loading &&
        <div className="categories">
          {categories && <Categories isFrontPage={false} categorieList={categories} ></Categories>}
        </div>
      }
    </Fragment>
  );
}
