import styles from './Chat.module.css'
import {  useAppSelector } from '../../../redux/type'
import { useMemo } from 'react'
import { getDateDDMMYYYY } from '../../../utils/getDate'
import { formatTime } from '../../../utils/formatTime'
import useUserChatLogical from './useUserChatLogical'
import { Fragment } from 'react'


export default function ChatModal() {

  const { isOpen, adminAnswerLoading } = useAppSelector((s) => s.support)
 
  const {
    messages,
    value,
    updateValue,
    sendMessage,
   } = useUserChatLogical();
  
  
  console.log(messages)
  
  const memoMessages = useMemo(() => {
   
 
    if ( Object.keys(messages).length === 0) return <div>No messages...</div >;//! edit after add api
    const messagesArr = Object.entries(messages)
    let currentDate = '';
    const messagesDataToShow = [];
    
    for (let index = 0; index < messagesArr.length; index++) {
      const [time, messagesItems] = messagesArr[index];
      const date = getDateDDMMYYYY(+time);
      const formatedTime = formatTime(+time);
      const isNeededDate = date !== currentDate;
      currentDate = date;
    messagesDataToShow.push(

    <Fragment key={time}>
      {isNeededDate && <div className={styles.date}>{date}</div>}
          <li className={styles.message} style={{
            marginRight: messagesItems.is ? 'auto' : 0,
            marginLeft:messagesItems.is?0:'auto'
           }}>
        <span className={styles.time}>{formatedTime}</span>
            <div
              className={styles.messageText}
              style={{
                color:  messagesItems.is?'black':'white',
                background: messagesItems.is?'#E2E8F0':'palevioletred'
              }}
            >{messagesItems.message}</div>
      </li>
    </Fragment>

);
      
       
      
    }
    return messagesDataToShow
  }, [messages]);
   if (!isOpen) return null;
    
  return (
    <div className={styles.modal}>
      <header className={styles.header}>Admin</header>
      <div className={styles.chat}>
        
        <ul className={styles.messages}>
           {memoMessages}
        </ul>

        {adminAnswerLoading && <div>Админ скоро ответит вам...</div>}
        
        <input value={value} className={styles.input} type="text" placeholder='Message...' onChange={(e) => updateValue(e.target.value)}
          onKeyDown={(e) => {
          if (e.key === 'Enter') sendMessage();
        }} />
        
      </div>
     
      
    </div>
  )
}
