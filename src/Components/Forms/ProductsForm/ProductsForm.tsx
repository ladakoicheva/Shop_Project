import styles from './ProductsForm.module.css';
import { useFormik } from 'formik';
import IOSSwitch from '../../Switch';
import { schema } from '../schemas/productsValidationSchema';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../../services/firebase/db/products';
import { useState } from 'react';
import { Autorisation_HOC } from '../../../HOC/Autorisation_HOC';
import { editProduct } from '../../../services/firebase/db/products';
import { updateBasketEditProduct } from '../../../redux/basket/basket';
import { openLoading } from '../../../redux/loading/loading';
import { closeLoading } from '../../../redux/loading/loading';
import { useAppDispatch, useAppSelector } from '../../../redux/type';
import type { productI } from '../../../../types/types';
import { ImageProduct } from '../../../utils/Image';


type props = {
  onClose: () => void,
  product:productI
}

function ProductsForm({ onClose, product }: props) {

  const auth = useAppSelector((s) => s.auth)
  const navigate = useNavigate();
  const [img, setImg] = useState<{ file: File|null, src: string } | null>( product? { file:null ,src:product.img }: null);
  const dispatch = useAppDispatch()
  const basket = useAppSelector((s) => s.basket.data)

  const formik = useFormik<Omit<productI, 'id'>>({
    initialValues: {
      name: product ? product.name : '',
      category: product ? product.category : '',
      price: product ? product.price : 0,
      currency: product ? product.currency : 'UAH',
      inStock: product ? product.inStock : false,
      rating: product ? product.rating : 1,
      img: product ? product.img : ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const dataToSave = { ...values, id: product.id }
      product ? updateItem(auth?.user?.uid!, product.id, dataToSave, img?.file!) : create(dataToSave)
    },


  });

  //product, uid, id, newData, file

  const create = async (product:productI) => {
    dispatch(openLoading())
    await addProduct(product, img?.file, auth?.user?.uid!)
    navigate(`/products/${auth?.user?.uid}`)
    dispatch(closeLoading())
  }

  const updateItem = async (uid:string, id:string, newData:any, file:File) => {

    const fieldsToUpdate:Partial<productI> = {};

    for (const key of Object.keys(product) as (keyof productI)[]) {
    

      if (product[key] !== newData[key]) fieldsToUpdate[key] = newData[key]
    }
    if (fieldsToUpdate) {
      const res = await editProduct(uid, id, fieldsToUpdate, file);
      const basketCopy = { ...basket };
      if (basketCopy[id] && res.ok) {
        basketCopy[id] = {
          ...basketCopy[id],
          product: {
            ...basketCopy[id].product,
            ...res.data
          }
        };

        // basketContext.updateBasketEditProduct(basketCopy)

        dispatch(updateBasketEditProduct(basketCopy))
      }
      if (res.ok) onClose()
    }

    // if (dataToUpdate) {
    //   const copy = [...products];
    //   const index = copy.findIndex((el) => el.id == id);
    //   copy[index] = { ...copy[index], ...dataToUpdate };
    //   setProducts(copy)
    // }


  }






  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> ) => {

    const file = e.target?.files[0];
   

    const reader = new FileReader();


    reader.onload = (event) => {
      const src = event.target.result;
      setImg({ file: file, src: src });
    };

    reader.readAsDataURL(file);

  }




  return (
    <>

      <form className={styles.productForm} onSubmit={formik.handleSubmit}>
        {product && <span onClick={onClose} className={styles.close}>×</span>}
        <h1>{product ? 'Edit Product' : 'Add Product'} </h1>
        <hr style={{ width: '100%' }} />


        {!img ? <input onChange={handleFileChange} type="file" id='img' accept="image/*" /> : <div className={styles.imgPreview}>
          <ImageProduct src={img?.src} alt="productImg" className='' /> <span onClick={() => setImg(null)}>×</span>
        </div>}





        <label htmlFor="name">Product name</label>
        <input onChange={formik.handleChange} value={formik.values.name} id='name' type="text" placeholder='product`s name' />

        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <label htmlFor="category" >Category</label>
        <input onChange={formik.handleChange} value={formik.values.category} id='category' placeholder='product`s category' type="text" />

        {formik.touched.category && formik.errors.category ? (
          <div>{formik.errors.category}</div>
        ) : null}
        <label htmlFor="price">Price</label>
        <input onChange={formik.handleChange} value={formik.values.price} min="0" max="1000000" step="0.01" id='price' placeholder='product`s price' type="number" />

        {formik.touched.price && formik.errors.price ? (
          <div>{formik.errors.price}</div>
        ) : null}

        <select onChange={formik.handleChange} id="currency" value={formik.values.currency}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
        </select>

        <label htmlFor="inStock">in Stock</label>
        <IOSSwitch onChange={formik.handleChange} checked={formik.values.inStock} id='inStock' />

        <label htmlFor="rating">Rating (1-5)</label>
        <input onChange={formik.handleChange} value={formik.values.rating} min="1" max="5" step="0.5" id='rating' type="range" />

        <div>{formik.values.rating}</div>

        {formik.touched.rating && formik.errors.rating ? (
          <div>{formik.errors.rating}</div>
        ) : null}

        <button type='submit'> Save</button>

      </form>
    </>
  )

}




const AuthenticatedProductsForm = Autorisation_HOC(ProductsForm);
export default AuthenticatedProductsForm;