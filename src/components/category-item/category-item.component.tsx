import { useNavigate } from 'react-router-dom';
import { TCategory } from '../category-list/category-list.component';
import './category-item.styles.scss';

export type CategoryItemProps = {
  category: TCategory;
};

const CategoryItem = ({ category }: CategoryItemProps) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(`/${route}`);

  return (
    <div className="category-container" onClick={onNavigateHandler}>
      <div
        className="background-image"
        style={{ backgroundImage: `URL(${imageUrl})` }}
      ></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
