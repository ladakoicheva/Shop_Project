import { createPortal } from 'react-dom';
import styles from './ProductsForm.module.css';
import { useFormik } from 'formik';
import IOSSwitch from '../../Switch';
import { schema } from '../schemas/productsValidationSchema';
import { Autorisation_HOC } from '../../../HOC/Autorisation_HOC';
import type { productI } from '../../../../types/types';
import { ImageProduct } from '../../../utils/Image';
import UseProductsFormLogical from './UseProductsFormLogical';

type props = {
  onClose: () => void,
  product:productI
}

function ProductsForm({ onClose, product }: props) {
    const  {
      auth,
      img,
      create,
      updateItem,
      handleFileChange,
      updateImage,
    }= UseProductsFormLogical({ onClose, product })
 

  const formik = useFormik<Omit<productI, 'id'>>({
    initialValues: {
    name: product?.name ?? '',
    category: product?.category ?? '',
    price: product?.price ?? 0,
    currency: product?.currency ?? 'UAH',
    inStock: product?.inStock ?? false,
    rating: product?.rating ?? 1,
    img: product?.img ?? ''
  },
    validationSchema: schema,
    onSubmit: (values) => {
      const uid = auth?.user?.uid!;
      const currentProductID =  product ?product.id:"";
      const dataToSave = values;
      const dataToSaveOnEdit = { ...dataToSave, id: currentProductID };

      product ? updateItem(uid, currentProductID,dataToSaveOnEdit, img?.file!) : create(dataToSave)
    },


  });


  const modalContent = (
    <div className={styles.backdrop} onClick={() => onClose && onClose()}>
      <form className={styles.productForm} onSubmit={formik.handleSubmit} onClick={(e) => e.stopPropagation()}>
        {product && <span onClick={onClose} className={styles.close}>×</span>}
        <h1>{product ? 'Edit Product' : 'Add Product'} </h1>
        <hr className={styles.divider} style={{ width: '100%' }} />

        {!img ? <input onChange={handleFileChange} type="file" id='img' accept="image/*" /> : <div className={styles.imgPreview}>
          <ImageProduct src={img?.src!} alt="productImg" className='' /> <span onClick={() => updateImage(null)}>×</span>
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
    </div>
  );

  return createPortal(modalContent, document.body);
}





const AuthenticatedProductsForm = Autorisation_HOC(ProductsForm);
export default AuthenticatedProductsForm;