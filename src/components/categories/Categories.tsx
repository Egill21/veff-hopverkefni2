import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ICategory } from '../../api/types';

import './Categories.scss';

export default function Categories(props: { isFrontPage: boolean, categorieList: ICategory[] }) {

  const { isFrontPage, categorieList } = props;

  function categoryClick(category: number) {
    console.log(`${category} clicked!`);
  }

  if (isFrontPage) {
    return (
      <Fragment>
        {categorieList.map((category, i) => {
          return (
            <div className="categories__col">
              <div key={i} className="categories__category">
                <p>{category.title}</p>
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {categorieList.map((category, i) => {
          return (
            <div className="categories__col">
              <Link key={i} className="categories__title" to={`/categories/${category.id}`}>
                <div onClick={() => categoryClick(category.id)} className="categories__category__back">
                  <p>{category.title}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </Fragment>
    );
  }
}
