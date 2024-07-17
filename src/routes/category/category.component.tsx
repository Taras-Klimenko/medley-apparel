import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

import { useSelector } from 'react-redux';
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import CategoryDescription from '../../components/category-description/category-description.component';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import './category.styles.scss';

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Link to="/shop">
        <h2 className="category-title">
          <span className="bounce-left">
            <span>&#10094;</span>
            <span>&#10094;</span>
            <span>&#10094;</span>
          </span>{' '}
          {category.toUpperCase()}
        </h2>
      </Link>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <CategoryDescription category={category} />
          <div className="single-category-container">
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Category;
