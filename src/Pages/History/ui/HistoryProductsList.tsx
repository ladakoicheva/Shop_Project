import type { productI } from "../../../../types/types"

export default function HistoryProductsList({ product }: { product: productI }) {
  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.9rem',
      color: 'var(--text-secondary)',
      padding: '4px 0'
    }}>
      <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{product.name}</span>
      {product.count && (
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', opacity: 0.8, color: 'var(--text-muted)' }}>x{product.count}</span>
      )}
    </li>
  );
}
