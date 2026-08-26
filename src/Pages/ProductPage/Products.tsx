import { useEffect, useMemo, useState, useCallback } from 'react';
import { minSort, maxSort } from '../../utils/sort';
import ProductCard from '../../Components/ProductCard/ProductCard';
import styles from './Products.module.css';
import FilterProducts from '../../Components/FilterProducts/FilterProducts';
import { useParams } from 'react-router-dom';
import ProductsForm from '../../Components/Forms/ProductsForm/ProductsForm';
import { NoFound } from '../../uix/NoFound';
import ShopName from '../../Components/FilterBg/ShopName';
import { connectLiveSetting } from '../../services/firebase/socket/setting';
import { connectToAllProducts } from '../../services/firebase/socket/product';
import { addToBasket, deleteFromBasket } from '../../redux/basket/basket';
import { setProductsData, editProduct, deleteProduct } from '../../redux/products/products';
import { useAppDispatch, useAppSelector } from '../../redux/type';
import type { productI, settingsI } from '../../../types/types';

export default function Products() {
  const auth = useAppSelector((s) => s.auth);
  const [products, setProducts] = useState<productI[]>([]);
  const [showProducts, setShowProducts] = useState<productI[]>(products);
  const [editingProduct, setEditingProduct] = useState<productI | null>(null);
  const { favorites } = useAppSelector((s) => s.fav);
  const basket = useAppSelector((s) => s.basket.data);
  const dispatch = useAppDispatch();

  const [style, setStyle] = useState({
    bgbg: 'rgba(255,255,255)',
    name: 'shop',
    namecolor: 'rgba(255,242,242)',
    namefontSize: '30',
    pricecolor: 'black',
    pricefontSize: '24',
    currency: 'UAH',
    isAdmin: false,
  });
  const { uid } = useParams();

  useEffect(() => {
    setShowProducts(products);
  }, [products]);

  useEffect(() => {
    const callBack = (data: settingsI) => {
      setStyle((prev) => ({ ...prev, ...data }));
    };
    const unsubsctibe = connectLiveSetting(callBack, uid!);
    return unsubsctibe;
  }, [uid, auth.user]);

  useEffect(() => {
    const addProduct = (data: productI): void => {
      setProducts((products) => [...products, data]);
      dispatch(setProductsData({ currentUID: uid!, user: auth.user, data }));
    };

    const updateProducts = (data: productI): void => {
      const updateStateProduct = (products: productI[]) => {
        const copy = [...products];
        const index = copy.findIndex((el) => el.id === data.id);
        copy[index] = { ...copy[index], ...data };
        return copy;
      };
      setProducts((products) => updateStateProduct(products));
      dispatch(editProduct({ currentUID: uid!, user: auth.user, data }));
    };

    const deleteItem = (data: productI) => {
      setProducts((products) => products.filter((el) => el.id !== data.id));
      dispatch(deleteProduct({ currentUID: uid!, user: auth.user, data }));
      dispatch(deleteFromBasket(data));
    };

    const liveConnectProducts = (type: string, data: productI) => {
      switch (type) {
        case 'added':
          return addProduct(data);
        case 'modified':
          return updateProducts(data);
        case 'removed':
          return deleteItem(data);
      }
    };
    const unsubscribe = connectToAllProducts(uid!, liveConnectProducts);
    return unsubscribe;
  }, [uid, auth.user, dispatch]);

  const filterProducts = useCallback(
    (text: string, category: string, price: string) => {
      const search = text.toLowerCase();

      const filtered = products.filter((el) => {
        const checkText = text === '' || el.name.toLowerCase().includes(search);
        const checkCategory = category === 'All' || el.category === category;

        return checkText && checkCategory;
      });
      if (price !== 'normal') {
        const callback = price === 'min' ? minSort : maxSort;
        filtered.sort(callback);
      }
      setShowProducts(filtered);
    },
    [products]
  );

  const memoProducts = useMemo(() => {
    return showProducts.map((el) => {
      const isFavorit = favorites.includes(el.id);
      return (
        <ProductCard
          isFavorit={isFavorit}
          basketContext={{
            addToBasket: () => dispatch(addToBasket(el)),
            data: basket,
            deleteFromBasket: () => dispatch(deleteFromBasket(el)),
          }}
          auth={auth}
          key={el.id}
          style={style}
          onEdit={() => setEditingProduct(el)}
          product={el}
        />
      );
    });
  }, [basket, auth, style, showProducts, favorites, dispatch]);

  return (
    <div className={styles.catalogWrapper}>
      <ShopName name={style.name} />
      {editingProduct && (
        <ProductsForm product={editingProduct} onClose={() => setEditingProduct(null)} />
      )}
      <FilterProducts products={products} filterProducts={filterProducts} />
      {showProducts.length >= 1 ? (
        <ul className={styles.grid_template_columns}>{memoProducts}</ul>
      ) : (
        <NoFound text="Товары не найдены" />
      )}
    </div>
  );
}