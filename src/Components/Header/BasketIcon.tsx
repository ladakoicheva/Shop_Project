import { Link } from "react-router-dom"
import styles from './Header.module.css'
import { useAppSelector } from "../../redux/type"



export default function BasketIcon() {
  const basket = useAppSelector((s) => s.basket.data)
  console.log('render basketicon')
  return (
   <div className={styles.basketWrapper}>
            <Link to='/basket'><span className={styles.basketIcon}>🛒</span></Link>
            {Object.keys(basket).length > 0 && (
              <span className={styles.basketCount}>{Object.keys(basket).length}</span>
            )}
          </div>
  )
}


