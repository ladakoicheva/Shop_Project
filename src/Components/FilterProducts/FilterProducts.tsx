import { useEffect, useMemo } from 'react';
import { useFilterProducts } from './filterProductsLogical';
import styles from './FilterProducts.module.css';
import type { productI } from '../../../types/types';
import { SearchIcon } from '../../utils/svgIcons';

type props = {
  filterProducts: (searchValue: string, selectedCategory: string, price: string) => void;
  products: productI[];
};

export default function FilterProducts({ filterProducts, products }: props) {
  const {
    setSelectedCategory,
    setPrice,
    change,
    selectedCategory,
    price,
    searchValue,
  } = useFilterProducts();

  const options = useMemo(() => {
    if (!products) return [];
    const categoriesSet = new Set(products.map((el) => el?.category));
    const optionsArr = Array.from(categoriesSet).map((el) => (
      <option key={el} value={el}>
        {el}
      </option>
    ));
    return optionsArr;
  }, [products]);

  useEffect(() => {
    filterProducts(searchValue, selectedCategory, price);
  }, [searchValue, selectedCategory, price]);

  return (
    <div className={styles.filterProducts}>
      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <SearchIcon size={20} color="#10b981" />
          <input
            className={styles.searchInput}
            onChange={change}
            value={searchValue}
            type="search"
            placeholder="Поиск товаров по названию..."
          />
        </div>

        <div className={styles.selectGroup}>
          <select
            className={styles.selectInput}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category"
          >
            <option value="All">Все категории</option>
            {options}
          </select>

          <select
            className={styles.selectInput}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="normal" hidden>
              Сортировка по цене
            </option>
            <option value="min">Сначала дешевле</option>
            <option value="max">Сначала дороже</option>
          </select>
        </div>
      </div>
    </div>
  );
}
