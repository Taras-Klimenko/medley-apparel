import {useContext} from 'react'
import {ProductContext} from '../../contexts/product.context'

import './shop.styles.scss'

import ProductCard from '../../components/product-card/product-card.component';

const Shop = () => {

    const {currentProducts} = useContext(ProductContext);
    
    return (

        <div className='products-container'>
            {currentProducts.map((item) => <ProductCard key={item.id} product={item}></ProductCard>)}
        </div>
    )

}

export default Shop;