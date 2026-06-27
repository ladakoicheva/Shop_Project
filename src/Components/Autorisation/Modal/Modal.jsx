import SignInForm from "../../Forms/SignInForm/SignInForm";
import SignUpForm from "../../Forms/SignUpForm/SignUpForm";
import { TYPE_MODAL } from "../../Forms/typeModeHelper";
import styles from './Modal.module.css'
import  { useAuthContext } from "../../../store/features/useAuth";

export default function Modal({setModalOpen}) {
  const { authMode } = useAuthContext();
  

  return (

    <div className={styles.modal}>
      <div className={styles.modalHeader}><h3>{authMode.text}</h3>  <span onClick={() => setModalOpen(false)} className={styles.closeBtn}>✕</span> </div>
      <hr />
      {authMode.type === TYPE_MODAL.SING_UP.type
        ? <SignUpForm setModalOpen={setModalOpen} />
        : <SignInForm setModalOpen={setModalOpen} x/>}
    </div>
  )
}
