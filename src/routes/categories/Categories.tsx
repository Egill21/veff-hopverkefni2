import React, { Fragment ,useState, useEffect } from 'react';

import { ICategory } from '../../api/types';

import Categories from '../../components/categories/Categories';

import { getCategories } from '../../api/index';

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
      {categories && <Categories isFrontPage={false} categorieList={categories} ></Categories>}
    </Fragment>
  );
}
