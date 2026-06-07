import styles from './Header.module.css'
import { Link, useParams } from 'react-router-dom'
import { Autorisation } from '../Autorisation/Authorise/Autorisation'
import FilterProducts from '../FilterProducts/FilterProducts'
import { useStoreContext } from '../../store/store'
import { useMemo } from 'react'

export default function Header() {


  const { basket, isLogin, user } = useStoreContext();
 

  const memoNavigation = useMemo(() => {
    if (isLogin) {
      return <>
        <Link to={"products/" + user.uid}>Products</Link>
        <Link to="/add">Add product</Link>
        <Link to='setting'>Setting</Link>
      </>
    } 
  }, [isLogin, user])


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
