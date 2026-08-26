import style from '../../Components/ProductCard/ProductCard.module.css';
import { styleConfig, type styleConfigE } from './type';
import { typeStyleE } from './type';

type props = {
  openStyle: (keys: styleConfigE[], type: typeStyleE) => void;
  getStyle: (name: string) => string[];
};

export default function ExampleProductCard({ openStyle, getStyle }: props) {
  const [colorName, fontSizeName] = getStyle('name');
  const [colorPrice, fontSizePrice] = getStyle('price');
  const [bgColor] = getStyle('bg');

  return (
    <article
      className={style.productCard}
      style={{
        width: '100%',
        maxWidth: '280px',
        background: bgColor || '#ffffff',
        cursor: 'pointer',
      }}
      onClick={() => {
        const s = styleConfig.bg;
        openStyle([s], typeStyleE.bg);
      }}
    >
      <div className={style.imgWrapper}>
        <img
          className={style.productImg}
          src="https://img.joomcdn.net/7395a4bf7ca6e4e56be137088a9ce9deb834c1e0_original.jpeg"
          alt="Preview Product"
        />
        <span className={`${style.inStockBadge} ${style.inStock}`}>✓ В наличии</span>
      </div>

      <div className={style.productHeader}>
        <h3
          onClick={(e) => {
            e.stopPropagation();
            openStyle([styleConfig.color, styleConfig.fontSize], typeStyleE.name);
          }}
          className={style.productName}
          style={{
            color: colorName,
            fontSize: fontSizeName ? `${fontSizeName}px` : undefined,
          }}
        >
          Образец товара
        </h3>
      </div>

      <section className={style.infoSection}>
        <div className={style.buyRow}>
          <h2
            onClick={(e) => {
              e.stopPropagation();
              openStyle([styleConfig.color, styleConfig.fontSize], typeStyleE.price);
            }}
            style={{
              color: colorPrice || '#10b981',
              fontSize: fontSizePrice ? `${fontSizePrice}px` : '1.3rem',
              fontWeight: 800,
            }}
          >
            200 USD
          </h2>
          <div className={style.basketControls}>
            <button className={style.actionBtn}>+</button>
          </div>
        </div>
      </section>
    </article>
  );
}