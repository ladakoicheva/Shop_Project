
import Modal from "../Modal/Modal";
import { useState } from "react";
import styles from './Authorisation.module.css'
import useAuth from "../../../store/features/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/auth/auth";

export const Autorisation = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch()
  const { user, authMode } = useSelector((s) => s.auth);
  return (

    <div>
      {!user ? <button onClick={() => setModalOpen(true)}>{authMode.text}</button> : <div className={styles.userInfo}><h4>{user.email}</h4> <button onClick={()=>dispatch(logOut())}>Log out</button></div>}
      {modalOpen && <Modal modalOpen={modalOpen} setModalOpen={ setModalOpen} />}
    </div>

  )
}
