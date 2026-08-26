import styles from './ProductsForm.module.css';
import { useFormik } from 'formik';
import IOSSwitch from '../../Switch';
import { schema } from '../schemas/productsValidationSchema';
import { Autorisation_HOC } from '../../../HOC/Autorisation_HOC';
import type { productI } from '../../../../types/types';
import { ImageProduct } from '../../../utils/Image';
import UseProductsFormLogical from './UseProductsFormLogical';

type props = {
  onClose: () => void;
  product: productI;
};

function ProductsForm({ onClose, product }: props) {
  const { auth, img, create, updateItem, handleFileChange, updateImage } = UseProductsFormLogical({
    onClose,
    product,
  });

  const formik = useFormik<Omit<productI, 'id'>>({
    initialValues: {
      name: product?.name ?? '',
      category: product?.category ?? '',
      price: product?.price ?? 0,
      currency: product?.currency ?? 'UAH',
      inStock: product?.inStock ?? false,
      rating: product?.rating ?? 1,
      img: product?.img ?? '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const uid = auth?.user?.uid!;
      const currentProductID = product ? product.id : '';
      const dataToSave = values;
      const dataToSaveOnEdit = { ...dataToSave, id: currentProductID };

      product
        ? updateItem(uid, currentProductID, dataToSaveOnEdit, img?.file!)
        : create(dataToSave);
    },
  });

  return (
    <form className={styles.productForm} onSubmit={formik.handleSubmit}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>
          {product ? 'Редактировать товар' : 'Добавить новый товар'}
        </h2>
        {onClose && (
          <span onClick={onClose} className={styles.close}>
            ✕
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Фотография товара</label>
        {!img ? (
          <input onChange={handleFileChange} type="file" id="img" accept="image/*" />
        ) : (
          <div className={styles.imgPreview}>
            <ImageProduct src={img?.src!} alt="productImg" className="" />
            <span className={styles.removeImgBtn} onClick={() => updateImage(null)}>
              ✕
            </span>
          </div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="name">
          Название товара
        </label>
        <input
          onChange={formik.handleChange}
          value={formik.values.name}
          id="name"
          type="text"
          placeholder="Например: Смартфон Samsung Galaxy"
        />
        {formik.touched.name && formik.errors.name && (
          <div className={styles.errorMsg}>{formik.errors.name}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="category">
          Категория
        </label>
        <input
          onChange={formik.handleChange}
          value={formik.values.category}
          id="category"
          placeholder="Например: Электроника"
          type="text"
        />
        {formik.touched.category && formik.errors.category && (
          <div className={styles.errorMsg}>{formik.errors.category}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="price">
          Цена и Валюта
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            onChange={formik.handleChange}
            value={formik.values.price}
            min="0"
            max="1000000"
            step="0.01"
            id="price"
            placeholder="Цена"
            type="number"
          />
          <select
            onChange={formik.handleChange}
            id="currency"
            value={formik.values.currency}
            style={{ width: '120px' }}
          >
            <option value="UAH">UAH (₴)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>
        {formik.touched.price && formik.errors.price && (
          <div className={styles.errorMsg}>{formik.errors.price}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="inStock">
          Статус наличия
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IOSSwitch
            onChange={formik.handleChange}
            checked={formik.values.inStock}
            id="inStock"
          />
          <span>{formik.values.inStock ? '✓ В наличии' : '✕ Нет в наличии'}</span>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="rating">
          Рейтинг товара ({formik.values.rating} из 5)
        </label>
        <input
          onChange={formik.handleChange}
          value={formik.values.rating}
          min="1"
          max="5"
          step="0.5"
          id="rating"
          type="range"
        />
        {formik.touched.rating && formik.errors.rating && (
          <div className={styles.errorMsg}>{formik.errors.rating}</div>
        )}
      </div>

      <button className={styles.submitBtn} type="submit">
        Сохранить товар
      </button>
    </form>
  );
}

const AuthenticatedProductsForm = Autorisation_HOC(ProductsForm);
export default AuthenticatedProductsForm;