
import Modal from "../Modal/Modal";
import { useEffect } from "react";
import styles from './Authorisation.module.css'
import { useStoreContext } from "../../../store/store";

export const Autorisation = () => {



  const { user, modalOpen, setModalOpen, authMode, logOut } = useStoreContext()
  return (

    <div>
      {!user ? <button onClick={() => setModalOpen(true)}>{authMode.text}</button> : <div className={styles.userInfo}><h4>{user.email}</h4> <button onClick={logOut}>Log out</button></div>}
      {modalOpen && <Modal />}
    </div>

  )
}
