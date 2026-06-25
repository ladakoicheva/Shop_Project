import { use, useEffect, useMemo, useState } from "react"
import { minSort, maxSort } from "../../utils/sort";
import ProductCard from "../../Components/ProductCard/ProductCard"
import styles from './Products.module.css'
import FilterProducts from "../../Components/FilterProducts/FilterProducts";
import { getAllProducts } from "../../services/firebase/db/products";
import { useParams } from "react-router-dom";
import ProductsForm from "../../Components/Forms/ProductsForm/ProductsForm"
import { NoFound } from "../../uix/NoFound";
import ShopName from "../../Components/FilterBg/ShopName";
import { getSettings } from "../../services/firebase/db/settings";
import useProductManager, { useProductContext } from "../../store/features/useProductManager";
import { useAuthContext } from "../../store/features/useAuth";





export default function Products() {
  const { openLoading, closeLoading, updateStyles, isLoadingApp, user } = useAuthContext()
  const { setProductsData ,deleteProduct,editProductData} =  useProductContext()
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isOpenPage, setIsOpenPage] = useState(true);
  const [style, setStyle] = useState({
    bgbg: "rgba(255,255,255)",
    name: "shop",
    namecolor: "rgba(255,242,242)",
    namefontSize: "30",
    pricecolor: "black",
    pricefontSize: "24"
  });
  const { uid } = useParams();
  const setProductsLocal = (data) => {
    setProducts(data)
  }

  console.log(style)


  useEffect(() => {

    const getUserSettings = async () => {
      const response = await getSettings(uid)
      if (response.ok && response.data) {
        setStyle(response.data)
      }

    }
    const getProducts = async () => {
      setIsOpenPage(true)
      openLoading();
      const res = await getAllProducts(uid)
      if (res.ok) {
        const products = res.data;
        setShowProducts(products)
        setProducts(products)

        // for store
        setProductsData(products, uid)
      }
      closeLoading()
      setIsOpenPage(false)


    }
    


    uid && getProducts();

    getUserSettings();
    if (uid !== user?.uid && !isLoadingApp) localStorage.setItem('lastVisitedShop', uid)

  }, [uid,isLoadingApp])



  useEffect(() => {

    setShowProducts([...products])
  }, [products])


  const deleteItem = async (product, uid, id) => {
    const productsCopy = [...products]
    await deleteProduct(product, uid, id);

    setProducts(productsCopy.filter((el) => el.id !== id));

  }





  const filterProducts = (text, category, price) => {

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

  }

  if (isOpenPage) return <></>

  return (

    <div>
      <ShopName name={style.name}></ShopName>
      {editingProduct && (
        <ProductsForm
          products={products}
          setProducts={setProductsLocal}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          editProductData={editProductData}
        />
      )}

      <FilterProducts products={products} className={styles.filterProducts} filterProducts={filterProducts} />

      {products.length >= 1
        ? <ul className={styles.grid_template_columns}>
          {showProducts && showProducts.map((el) =>
            <li key={el.id}>
              <ProductCard
                key={el.id}
                product={el}
                style={style}
                onEdit={() => setEditingProduct(el)}
                deleteItem={()=>deleteItem(el,uid,el.id)}
                
              />
            </li>
          )}
        </ul> : <NoFound text="No products" />
      }
    </div>
  )
}


// search by name 
// select price min max
// select categories