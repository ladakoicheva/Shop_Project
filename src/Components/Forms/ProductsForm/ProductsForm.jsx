import styles from './ProductsForm.module.css';
import { useFormik } from 'formik';
import IOSSwitch from '../../Switch';
import { schema } from '../schemas/productsValidationSchema';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../../store/store';
import { addProduct } from '../../../services/firebase/db/products';
import { useState } from 'react';
import { Autorisation_HOC } from '../../../HOC/Autorisation_HOC';



function ProductsForm({ products, setProducts, onClose, product }) {



  const store = useStoreContext();
  const navigate = useNavigate();
  const [img, setImg] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: product ? product.name : '',
      category: product ? product.category : '',
      price: product ? product.price : '',
      currency: product ? product.currency : 'UAH',
      inStock: product ? product.inStock : false,
      rating: product ? product.rating : 1,
      img: product ? product.img : ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      product ? updateItem(store.user.uid, product.id, { ...values, id: product.id }, img?.file) : create(values)
    },


  });

  //product, uid, id, newData, file

  const create = async (product) => {
    store.openLoading()
    const response = await addProduct(product, img?.file, store.user.uid)

    store.closeLoading()
    navigate(`/products/${store.user.uid}`)
  }

  const updateItem = async (uid, id, newData, file) => {

    const fieldsToUpdate = {};

    for (const key in product) {
      if (product[key] !== newData[key]) fieldsToUpdate[key] = newData[key]
    }
    const dataToUpdate = await store.editProductData(uid, id, fieldsToUpdate, file);

    if (dataToUpdate) {
      const copy = [...products];
      const index = copy.findIndex((el) => el.id == id);
      copy[index] = { ...copy[index], ...dataToUpdate };
      setProducts(copy)
    }
    onClose()

  }






  const handleFileChange = (e) => {

    const file = e.target.files[0];
    if (!file) return;

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
          <img src={img?.src
          } alt="" /> <span onClick={() => setImg(null)}>×</span>
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






export default Autorisation_HOC(ProductsForm)