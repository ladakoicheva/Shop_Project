import { useEffect, useState } from "react"
import { minSort, maxSort } from "../../utils/sort";
import ProductCard from "../../Components/ProductCard/ProductCard"
import styles from './Products.module.css'
import FilterProducts from "../../Components/FilterProducts/FilterProducts";
import { data, useParams } from "react-router-dom";
import ProductsForm from "../../Components/Forms/ProductsForm/ProductsForm"
import { NoFound } from "../../uix/NoFound";
import ShopName from "../../Components/FilterBg/ShopName";
import { connectLiveSetting } from "../../services/firebase/socket/setting";
import { connectToAllProducts } from "../../services/firebase/socket/product";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../../redux/basket/basket";
import { deleteFromBasket } from "../../redux/basket/basket";

export default function Products({ auth, productManager }) {
  const {  user } = auth;
  const { setProductsData,  editProductData, isLoadingApp } = productManager;
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(products);
  const [editingProduct, setEditingProduct] = useState(null);
  const basket = useSelector((s) => s.basket.data);
  const dispatch = useDispatch();

  
  // const [isOpenPage, setIsOpenPage] = useState(true);
  const [style, setStyle] = useState({
    bgbg: "rgba(255,255,255)",
    name: "shop",
    namecolor: "rgba(255,242,242)",
    namefontSize: "30",
    pricecolor: "black",
    pricefontSize: "24"
  });
  const { uid } = useParams();

  // const setProductsLocal = (data) => {
  //   setProducts(data)

  // }
  // useEffect(() => {
  //   setShowProducts(products);
  // }, [products]);



  useEffect(() => {

    const callBack = (data) => {
      setStyle(prev => ({ ...prev, ...data }))
    }
    const unsubsctibe = connectLiveSetting(callBack, uid);



    // if (uid !== user?.uid && !isLoadingApp) localStorage.setItem('lastVisitedShop', uid)

    return unsubsctibe

  }, [uid, user?.uid,isLoadingApp ])



  useEffect(() => {

    const addProduct = (data) => {
      setProducts((products) => [data, ...products])
      setProductsData((products) => [data, ...products])
      setShowProducts((products) => [data, ...products]);
    }

    const updateProducts = (data) => {
      
      const updateStateProducts = (products) => {
        const copy = [...products]
        const index = copy.findIndex((el) => el.id == data.id);
        copy[index] = { ...copy[index], ...data };
        return copy;
      };


      // const basketCopy = { ...basket };
      // if (basketCopy[data.id]) {
      //   basketCopy[data.id].product = { ...basketCopy[data.id].product, ...data };
      //   updateBasketEditProduct(basketCopy)
      // }

      setProducts((products) => updateStateProducts(products))
      setShowProducts((products) => updateStateProducts(products))
      setProductsData((products) => updateStateProducts(products))

    }

    const deleteProduct = (data) => {
      console.log(data,data.id)
      setProducts((products) => products.filter((el) => el.id !== data.id));
      setShowProducts((products) => products.filter((el) => el.id !== data.id));
      setProductsData((products) => products.filter((el) => el.id !== data.id))
      // deleteFromBasket(data);

    }

    const liveConnectProducts = (type, data) => {
      

      switch (type) {
        case "added":
          console.log('added')
          return addProduct(data)
        case "modified":
          console.log("Обновлен:", data);
          return updateProducts(data)
        case "removed":
          console.log("Удален:", data);
          return deleteProduct(data);
      }
    }
    const unsubscribe = connectToAllProducts(uid, liveConnectProducts);
    return () => {
      unsubscribe();
  
    };
  }, [uid, user])


 


  const filterProducts = useCallback((text, category, price) => {
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
  }, [products]);


  return (

    <div>
      <ShopName name={style.name}></ShopName>
      {editingProduct && (
        <ProductsForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          editProductData={editProductData}
          auth={auth}
         
        />
      )}

      <FilterProducts products={products} className={styles.filterProducts} filterProducts={filterProducts} />

      {products.length >= 1
        ? <ul className={styles.grid_template_columns}>
          {showProducts && showProducts.map((el) =>
            <li key={el.id}>
              <ProductCard
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

              />
            </li>
          )}
        </ul> : <NoFound text="no products" />
      }
    </div>
  )
}


// search by name 
// select price min max
// select categories