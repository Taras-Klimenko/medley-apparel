import './category-list.styles.scss';
import CategoryItem from '../category-item/category-item.component';



const CategoryList = ({categories}) => {
    return(<div className="categories-container">
        {categories.map((category) => {
          return <CategoryItem category={category} key={category.id} />;
        })}
      </div>)
}

export default CategoryList;