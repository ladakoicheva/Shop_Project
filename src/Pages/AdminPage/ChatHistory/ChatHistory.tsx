import styles from '../Admin.module.css'
import { Link } from 'react-router-dom';
import type { messageDataI } from '../type';

type props = {
  messages : messageDataI
}

export default function ChatHistory({ messages }:props) {
  const userEmailsArr = Object.keys(messages);
  return (
    <ul className={styles.chatHistory}>{
      userEmailsArr.map((email) => {
        return <Link  className = {styles.userEmail} key={email } to ={`/${email}`}>{email }</Link> 
      })
    }</ul>
  )
}


