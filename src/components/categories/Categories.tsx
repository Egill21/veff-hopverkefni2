import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ICategory } from '../../api/types';

import './Categories.scss';

export default function Categories(props: {
  isFrontPage: boolean;
  categorieList: ICategory[];
}) {
  const { isFrontPage, categorieList } = props;

  function categoryClick(category: number) {
    console.log(`${category} clicked!`);
  }
  return (
    <Fragment>
      <h2 className="categories__subheading">Skoðaðu vöruflokkana okkar</h2>
      <div className="categories__row">
        {categorieList.map((category, i) => {
          return (
            <div key={i} className="categories__col">
              <Link
                onClick={() => categoryClick(category.id)}
                className="categories__category"
                to={`/categories/${category.id}`}
              >
                <p className="categories__title">{category.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
