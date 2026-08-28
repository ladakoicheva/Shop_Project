import { Link } from "react-router-dom"
import styles from './Header.module.css'
import { useAppSelector } from "../../redux/type"
import  { memo } from "react"

function BasketIcon() {
  const basket = useAppSelector((s) => s.basket.data)
  const count = Object.keys(basket).length

  return (
    <div className={styles.basketWrapper}>
      <Link to='/basket' className={styles.basketLink} aria-label="Shopping Cart">
        <svg
          className={styles.basketSvg}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1.5" />
          <circle cx="19" cy="21" r="1.5" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </Link>
      {count > 0 && (
        <span className={styles.basketCount}>{count}</span>
      )}
    </div>
  )
}

export default memo(BasketIcon, () => true)