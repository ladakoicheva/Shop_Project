
import Modal from "../Modal/Modal";
import { useState } from "react";
import styles from './Authorisation.module.css'
import { useAppDispatch, useAppSelector } from "../../../redux/type";
import { logOut } from "../../../redux/auth/auth";

export const Autorisation = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, authMode } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch()
  return (

    <div>
      {!user ? <button onClick={() => setModalOpen(true)}>{authMode.text}</button> : <div className={styles.userInfo}><h4>{user.email}</h4> <button onClick={()=>dispatch(logOut())}>Log out</button></div>}
      {modalOpen && <Modal  setModalOpen={ setModalOpen} />}
    </div>

  )
}
