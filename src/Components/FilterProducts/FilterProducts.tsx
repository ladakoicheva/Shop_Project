import { useEffect, useMemo } from "react";
import { useFilterProducts } from "./filterProductsLogical";
import styles from './FilterProducts.module.css';
import type { productI } from "../../../types/types";


type props = {
  filterProducts: (searchValue:string, selectedCategory:string, price:string) => void,
  products:productI[]
}

export default function FilterProducts({ filterProducts, products }:props) {
  
  const {
    setSelectedCategory,
    setPrice,
    change,
    selectedCategory,
    price,
    searchValue
  } = useFilterProducts()

 
  

  const options = useMemo(() => {
    if (!products) return [];
    const categoriesSet = new Set(products.map((el) => el?.category));
    const optionsArr = Array.from(categoriesSet).map((el) => <option key={el} value={el}>{el}</option>)
    return optionsArr
  }, [products])

  useEffect(() => {
    filterProducts(searchValue, selectedCategory, price)
  }, [searchValue, selectedCategory, price])

  return (
    <div className={styles.filterProducts}>
      <div className={styles.filterGroup}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            className={styles.searchInput}
            onChange={change}
            value={searchValue}
            type="search"
            placeholder="Search by name..."
          />
        </div>

        <select
          className={styles.categorySelect}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
        >
          <option value="All">All</option>
          {options}
        </select>

        <select
          className={styles.priceSelect}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="normal" hidden>normal</option>
          <option value="min">Min price</option>
          <option value="max">Max price</option>
        </select>
      </div>
    </div>
  );
}

