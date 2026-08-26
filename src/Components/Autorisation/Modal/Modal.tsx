import { useAppSelector } from "../../../redux/type";
import SignInForm from "../../Forms/SignInForm/SignInForm";
import SignUpForm from "../../Forms/SignUpForm/SignUpForm";
import { TYPE_MODAL } from "../../Forms/typeModeHelper";
import styles from './Modal.module.css';

type props = {
  setModalOpen: (value: React.SetStateAction<boolean>) => void;
};

export default function Modal({ setModalOpen }: props) {
  const { authMode } = useAppSelector((s) => s.auth);

  return (
    <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{authMode.text}</h3>
          <span onClick={() => setModalOpen(false)} className={styles.closeBtn}>
            ✕
          </span>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
        {authMode.type === TYPE_MODAL.SIGN_UP.type ? (
          <SignUpForm setModalOpen={setModalOpen} />
        ) : (
          <SignInForm setModalOpen={setModalOpen} />
        )}
      </div>
    </div>
  );
}
