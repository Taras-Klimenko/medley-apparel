import {useParams, Link} from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss'

const Category = () => {
    const {category} = useParams(selectCategoriesMap);
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <Fragment>
            <Link to='/shop'><h2 className='category-title'>&#10094;&#10094;&#10094;&nbsp;{category.toUpperCase()}</h2></Link>
            <div className='single-category-container'>
                {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
        </Fragment>

    )

}

export default Category;