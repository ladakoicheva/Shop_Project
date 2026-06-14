
import Modal from "../Modal/Modal";
import { useEffect,useState } from "react";
import styles from './Authorisation.module.css'
import useAuth from "../../../store/features/useAuth";

export const Autorisation = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, authMode, logOut } = useAuth()
  return (

    <div>
      {!user ? <button onClick={() => setModalOpen(true)}>{authMode.text}</button> : <div className={styles.userInfo}><h4>{user.email}</h4> <button onClick={logOut}>Log out</button></div>}
      {modalOpen && <Modal modalOpen={modalOpen} setModalOpen={ setModalOpen} />}
    </div>

  )
}
