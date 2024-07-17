import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import './categories-preview.styles.scss';

import Spinner from '../../components/spinner/spinner.component';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="categories-description-container">
            <span className="phrase">Take a </span>
            <span className="phrase">look at our </span>
            <span className="phrase">carefully selected </span>
            <span className="phrase">items or browse </span>
            <span className="phrase">individual categories </span>
            <span className="phrase">to find even </span>
            <span className="phrase">more great options!</span>
          </div>
          {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (
              <CategoryPreview key={title} title={title} products={products} />
            );
          })}
        </>
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
