import styles from './Header.module.css'
import { Link} from 'react-router-dom'
import { Autorisation } from '../Autorisation/Authorise/Autorisation'
import { useMemo } from 'react'
import { useAppSelector } from '../../redux/type'
import BasketIcon from './BasketIcon'

export default function Header({}) {

  const {  user } = useAppSelector((s)=>s.auth)


  console.log('render header')

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
          <BasketIcon/>
        </div>
      </nav>
    </header>
  )
}
