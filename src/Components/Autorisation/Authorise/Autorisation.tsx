import Modal from '../Modal/Modal';
import { useState } from 'react';
import styles from './Authorisation.module.css';
import { useAppDispatch, useAppSelector } from '../../../redux/type';
import { logOut } from '../../../redux/auth/auth';
import { UserIcon, LogOutIcon } from '../../../utils/svgIcons';

export const Autorisation = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, authMode } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.authContainer}>
      {!user ? (
        <button className={styles.loginBtn} onClick={() => setModalOpen(true)}>
          <UserIcon size={16} />
          <span>{authMode.text}</span>
        </button>
      ) : (
        <div className={styles.userInfo}>
          <UserIcon size={16} color="#10b981" />
          <span className={styles.userEmail} title={user.email || ''}>
            {user.email}
          </span>
          <button
            className={styles.logoutBtn}
            onClick={() => dispatch(logOut())}
            title="Выйти из аккаунта"
          >
            <LogOutIcon size={14} />
            <span>Выйти</span>
          </button>
        </div>
      )}
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </div>
  );
};
