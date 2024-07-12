import './category-preview.styles.scss';
import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import { CategoryItem } from '../../store/categories/category.types';

export type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title}>
          <span className="title">
            {title.toUpperCase()}&nbsp;&#10095;&#10095;&#10095;
          </span>
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
