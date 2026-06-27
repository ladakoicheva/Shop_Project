import { useEffect, useMemo } from "react";
import { useFilterProducts } from "./filterProductsLogical";
import styles from './FilterProducts.module.css';

export default function FilterProducts({ filterProducts,products }) {
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
  }, [searchValue, selectedCategory, price, filterProducts])

  return (

    <div className={styles.filterProducts} >


      <div>
        <input onChange={change} value={searchValue} type="search" placeholder=" search by name..." />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} name="category" >
          <option value="All" >All</option>
          {options}
        </select>
      
        <select className={styles.selectBgRight} value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="normal" hidden>normal</option>
          <option value="min">Min price</option>
          <option value="max">Max price</option>
        </select>
        
      </div>




    </div>
  )
}
