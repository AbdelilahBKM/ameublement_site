

import { slugify } from './slugify';

export const prepareCategoryLink = (categoryId: number, categoryName: string, childName: string) => {
  const categorySlug = slugify(categoryName);
  const childSlug = slugify(childName);

  return `/product-category/${categoryId}/${categorySlug}/${childSlug}`;
};