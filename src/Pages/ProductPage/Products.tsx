import { useEffect, useMemo, useState } from "react"
import { minSort, maxSort } from "../../utils/sort";
import ProductCard from "../../Components/ProductCard/ProductCard"
import styles from './Products.module.css'
import FilterProducts from "../../Components/FilterProducts/FilterProducts";
import {  useParams } from "react-router-dom";
import ProductsForm from "../../Components/Forms/ProductsForm/ProductsForm"
import { NoFound } from "../../uix/NoFound";
import ShopName from "../../Components/FilterBg/ShopName";
import { connectLiveSetting } from "../../services/firebase/socket/setting";
import { connectToAllProducts } from "../../services/firebase/socket/product";
import { addToBasket } from "../../redux/basket/basket";
import { deleteFromBasket } from "../../redux/basket/basket";
import { setProductsData, editProduct, deleteProduct } from "../../redux/products/products";
import { useAppDispatch, useAppSelector } from "../../redux/type";
import type { productI } from "../../../types/types";
import type{ settingsI } from "../../../types/types";

export default function Products() {
  const auth = useAppSelector((s) => s.auth)
  const [value, setValue] = useState('');
  const [products, setProducts] = useState<productI[]>([]);
  const [showProducts, setShowProducts] = useState<productI[]>(products);
  const [editingProduct, setEditingProduct] = useState<productI | null>(null);
  const {  favorites } = useAppSelector((s)=>s.fav)
  const basket = useAppSelector((s) => s.basket.data);
  const {isLoadingApp}= useAppSelector((s)=>s.loading)
  const dispatch = useAppDispatch();

  const [style, setStyle] = useState({
    bgbg: "rgba(255,255,255)",
    name: "shop",
    namecolor: "rgba(255,242,242)",
    namefontSize: "30",
    pricecolor: "black",
    pricefontSize: "24",
    currency:"UAH"
  });
  const { uid } = useParams();
  
  useEffect(() => {
  setShowProducts(products)
},[products])


  useEffect(() => {

    const callBack = (data:settingsI) => {
      setStyle(prev => ({ ...prev, ...data }))
    }
    const unsubsctibe = connectLiveSetting(callBack, uid!);
    return unsubsctibe

  }, [uid])


    // const favorit = useMemo(():isFavI|null => {
    //   if (!user) return null
  
  
  
    //   const isInFav = favorites.includes(product.id);
  
    //   return {
    //     is: isInFav,
    //     src: isInFav ? images.star.on : images.star.off
    //   }
  
    // }, [favorites, user, product.id])

  useEffect(() => {

    const addProduct = (data: productI):void => {
      setProducts((products) => [...products, data])
      if(!isLoadingApp) dispatch(setProductsData({ currentUID: uid!, user: auth.user, data }))

    }

    const updateProducts = (data:productI):void => {
     
      const updateStateProduct = (products:productI[]) => {
        const copy = [...products]
        const index = copy.findIndex((el) => el.id == data.id);
        copy[index] = { ...copy[index], ...data };
        return copy;
      };
      setProducts((products) => updateStateProduct(products))
      dispatch(editProduct({ currentUID: uid!, user: auth.user, data }));

    }

    const deleteItem = (data:productI) => {
      setProducts((products) => products.filter((el) => el.id !== data.id));
      dispatch(deleteProduct({ currentUID: uid!, user:auth.user, data }));
      dispatch(deleteFromBasket(data))

    }

    const liveConnectProducts = (type:string, data:productI) => {


      switch (type) {
        case "added":
          console.log('added')
          return addProduct(data)
        case "modified":
          console.log("Обновлен:", data);
          return updateProducts(data)
        case "removed":
          console.log("Удален:", data);
          return deleteItem(data);
      }
    }
    const unsubscribe = connectToAllProducts(uid!, liveConnectProducts);
    return unsubscribe
  }, [uid,isLoadingApp])





  const filterProducts = (text:string, category:string, price:string) => {
    const search = text.toLowerCase();

    const filtered = products.filter((el) => {
      const checkText = text == '' || el.name.toLowerCase().includes(search);
      const checkCategory = category == 'All' || el.category === category;

      return checkText && checkCategory
    })
    if (price !== 'normal') {
      const callback = price === 'min' ? minSort : maxSort
      filtered.sort(callback)
    }
    setShowProducts(filtered);
  };

  const memoProducts = useMemo(() => {
    const products = showProducts.map((el) => {
    const isFavorit = favorites.includes(el.id);
      return <ProductCard
       
               isFavorit={isFavorit}
                basketContext={{
                  addToBasket: () => dispatch(addToBasket(el)),
                  data: basket,
                  deleteFromBasket: () => dispatch(deleteFromBasket(el))

                }}
                auth={auth}
                key={el.id}
                style={style}
                onEdit={() => setEditingProduct(el)}
                product={el}
              // deleteItem={() => deleteItem(el, uid, el.id)}

              />}
              )
      return products
  },[basket,auth.user,style,showProducts,favorites])


  return (
   

    <div>
        
      <ShopName name={style.name}></ShopName>
      {editingProduct && (
        <ProductsForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
      <FilterProducts products={products}  filterProducts={filterProducts} />
    <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
      {products.length >= 1
        ? <ul className={styles.grid_template_columns}>
        
          { memoProducts }
         
        </ul> : <NoFound text="no products" />
      }
    </div>
  )
}


// search by name 
// select price min max
// select categories