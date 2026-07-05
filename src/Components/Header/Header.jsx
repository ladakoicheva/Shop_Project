import styles from './Header.module.css'
import { Link} from 'react-router-dom'
import { Autorisation } from '../Autorisation/Authorise/Autorisation'
import FilterProducts from '../FilterProducts/FilterProducts'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'


export default function Header({auth}) {

  const { isLogin, user } = auth;
  const basket = useSelector((s)=>s.basket.data)
  const lastVisitedShopUID = localStorage.getItem('lastVisitedShop') || "";
  

  const memoNavigation = useMemo(() => {
    if (isLogin) {
      return <>
        {/* <Link to={"products/" + lastVisitedShopUID}>Home</Link> */}
        <Link to={"products/" + user.uid}>My Products</Link>
        <Link to="/add">Add product</Link>
        <Link to='setting'>Setting</Link>
        <Link to='history'>History</Link>
        <Link to='test'>Test</Link>
      </>
    } 
  }, [isLogin, user, lastVisitedShopUID])


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
