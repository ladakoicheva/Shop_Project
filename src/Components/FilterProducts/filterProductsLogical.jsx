import { useState } from "react";


export const useFilterProducts = () => {
 const [selectedCategory, setSelectedCategory] = useState('All');
  const [price, setPrice] = useState('normal');
  const [searchValue, setSearchValue] = useState('');

  const change = (e) => {
    setSearchValue(e.target.value)
  }


  return {
    selectedCategory,
    setSelectedCategory,

    price,
    setPrice,

    searchValue,
    change,
  }
}