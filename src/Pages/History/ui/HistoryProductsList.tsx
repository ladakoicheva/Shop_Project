import type { productI } from '../../../../types/types';
import style from './HistoryItemCard/HistoryItemCard.module.css';
import { useAppSelector } from '../../../redux/type';
import { convector } from '../../../utils/convector';

export default function HistoryProductsList({ product }: { product: productI }) {
  const { settings, rates } = useAppSelector((s) => s.auth);

  const convertedPrice = product.price
    ? convector(settings.currency || 'USD', product.currency || 'USD', product.price, rates)
    : null;

  return (
    <div className={style.productItem}>
      <span className={style.bullet} />
      <span>{product.name}</span>
      {convertedPrice !== null && (
        <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: '0.85rem' }}>
          {convertedPrice} {settings?.currency || 'USD'}
        </span>
      )}
    </div>
  );
}
