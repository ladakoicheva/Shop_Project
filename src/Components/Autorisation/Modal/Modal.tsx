import { useAppSelector } from "../../../redux/type";
import SignInForm from "../../Forms/SignInForm/SignInForm";
import SignUpForm from "../../Forms/SignUpForm/SignUpForm";
import { TYPE_MODAL } from "../../Forms/typeModeHelper";
import styles from './Modal.module.css'

type props = {
  setModalOpen: (value: React.SetStateAction<boolean>) => void
}

export default function Modal({setModalOpen}:props) {
  const { authMode } = useAppSelector((s)=>s.auth)
  

  return (

    <div className={styles.modal}>
      <div className={styles.modalHeader}><h3>{authMode.text}</h3>  <span onClick={() => setModalOpen(false)} className={styles.closeBtn}>✕</span> </div>
      <hr />
      {authMode.type === TYPE_MODAL.SIGN_UP.type
        ? <SignUpForm setModalOpen={setModalOpen} />
        : <SignInForm setModalOpen={setModalOpen} />}
    </div>
  )
}
