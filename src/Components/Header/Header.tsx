import styles from './Header.module.css'
import { Link} from 'react-router-dom'
import { Autorisation } from '../Autorisation/Authorise/Autorisation'
import { useMemo } from 'react'
import { useAppSelector } from '../../redux/type'


export default function Header({}) {

  const {  user } = useAppSelector((s)=>s.auth)
  const basket = useAppSelector((s)=>s.basket.data)

  

  const memoNavigation = useMemo(() => {
    if (!!user) {
      return <>
        {/* <Link to={"products/" + lastVisitedShopUID}>Home</Link> */}
        <Link to={"products/" + user.uid}>My Products</Link>
        <Link to="/add">Add product</Link>
        <Link to='setting'>Setting</Link>
        <Link to='history'>History</Link>
      </>
    } 
  }, [ user])


  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>

        <div className={styles.mainNav}>
          {memoNavigation}
        </div>


        <div className={styles.userActions}>
          <Autorisation />
          <div className={styles.basketWrapper}>
            <Link to='/basket'><span className={styles.basketIcon}>🛒</span></Link>
            {Object.keys(basket).length > 0 && (
              <span className={styles.basketCount}>{Object.keys(basket).length}</span>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
