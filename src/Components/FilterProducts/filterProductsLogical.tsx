import { useState, } from "react";


export const useFilterProducts = () => {
 const [selectedCategory, setSelectedCategory] = useState('All');
  const [price, setPrice] = useState('normal');
  const [searchValue, setSearchValue] = useState('');

  const change = (e:React.ChangeEvent<HTMLInputElement>) => {
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