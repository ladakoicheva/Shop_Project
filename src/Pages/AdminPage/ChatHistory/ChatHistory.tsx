import styles from '../Admin.module.css';
import { Link, useParams } from 'react-router-dom';
import type { messageDataI } from '../type';

type props = {
  messages: messageDataI;
};

export default function ChatHistory({ messages }: props) {
  const userEmailsArr = Object.keys(messages);
  const params = useParams<{ email?: string }>();

  return (
    <div className={styles.chatHistory}>
      <div className={styles.sidebarHeader}>💬 Чат с клиентами ({userEmailsArr.length})</div>
      {userEmailsArr.map((email) => {
        const isActive = params.email === email;
        const initial = email.charAt(0).toUpperCase();

        return (
          <Link
            className={`${styles.userEmail} ${isActive ? styles.userActive : ''}`}
            key={email}
            to={`/${email}`}
            title={email}
          >
            <div className={styles.userAvatar}>{initial}</div>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{email}</span>
            {messages[email]?.isIncomingAdmin && (
              <span className={styles.notification} title="Новое сообщение" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
