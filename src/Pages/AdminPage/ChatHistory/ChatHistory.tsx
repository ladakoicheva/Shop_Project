import styles from '../Admin.module.css'
import { Link, useParams } from 'react-router-dom';
import type { messageDataI } from '../type';

type props = {
  messages : messageDataI
}

export default function ChatHistory({ messages }:props) {
  const params = useParams<{ email?: string }>();
  const userEmailsArr = Object.keys(messages);

  return (
    <ul className={styles.chatHistory}>
      {userEmailsArr.map((email) => {
        const isActive = params.email === email;
        return (
          <Link
            className={`${styles.userEmail} ${isActive ? styles.userEmailActive : ''}`}
            key={email}
            to={`/${email}`}
          >
            {email}
            {messages[email].isIncomingAdmin && (
              <span className={styles.notification}></span>
            )}
          </Link>
        );
      })}
    </ul>
  );
}



