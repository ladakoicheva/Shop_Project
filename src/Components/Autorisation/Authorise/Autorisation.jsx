
import Modal from "../Modal/Modal";
import { useEffect } from "react";
import { autorisation } from "../../../../back/api";
import styles from './Authorisation.module.css'
import { useStoreContext } from "../../../store/store";

export const Autorisation = () => {

  /*const [modalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState(TYPE_MODAL.SING_UP);*/

  const { user, modalOpen, setModalOpen, authMode, logOut } = useStoreContext()
  return (

    <div>
      {!user ? <button onClick={() => setModalOpen(true)}>{authMode.text}</button> : <div className={styles.userInfo}><h4>{user.email}</h4> <button onClick={logOut}>Log out</button></div>}
      {modalOpen && <Modal />}
    </div>

  )
}
