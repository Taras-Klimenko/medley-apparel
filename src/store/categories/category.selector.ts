import { createSelector } from 'reselect';
import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';
import { RootState } from '../store';

const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((accumulator, category) => {
      const { title, items } = category;
      accumulator[title.toLowerCase()] = items;
      return accumulator;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
