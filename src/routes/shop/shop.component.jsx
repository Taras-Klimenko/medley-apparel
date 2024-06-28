import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils'
import {setCategories} from '../../store/categories/category.action'

import './shop.styles.scss'
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect( ()=> {
        const getGategoriesMap = async () => { 
            const categories = await getCategoriesAndDocuments();
            dispatch(setCategories(categories));
        }

        getGategoriesMap();
    }, [] )    

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}></Route>
            <Route path=':category' element={<Category/>}></Route>
        </Routes>

    )

}

export default Shop;