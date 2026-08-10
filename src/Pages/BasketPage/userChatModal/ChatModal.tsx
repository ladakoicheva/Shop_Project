import styles from './Chat.module.css'
import {  useAppSelector } from '../../../redux/type'
import { useEffect, useMemo, useRef } from 'react'
import { getDateDDMMYYYY } from '../../../utils/getDate'
import { formatTime } from '../../../utils/formatTime'
import useUserChatLogical from './useUserChatLogical'
import { Fragment } from 'react'
import { scrollDown } from '../../../utils/scroll'


export default function ChatModal() {

  const { isOpen} = useAppSelector((s) => s.support)
  const {
    messages,
    value,
    updateValue,
    sendMessage,
   } = useUserChatLogical();
  
  const ref = useRef(null)
  const isLoadingNeeded = useMemo(() => {

    const arr = Object.keys(messages)  ;
    const key = arr[arr.length-1]
    if (arr.length === 0) return false

    return messages[key].is
  },[messages])


  const memoMessages = useMemo(() => {
    if ( Object.keys(messages).length === 0) return <div>No messages...</div >;
    const times = Object.keys(messages);
    //@ts-ignore
    times.sort((a: string, b: string) => a - b);
    let currentDate = '';
    const res = times.map((time) => {
       //@ts-ignore
      const messageItem = messages[time]
    
      const date = getDateDDMMYYYY(+time);
      const formatedTime = formatTime(+time);
      const isNeededDate = date !== currentDate;
      currentDate = date;
      return  <Fragment key={time}>
      {isNeededDate && <div className={styles.date}>{date}</div>}
          <li className={styles.message} style={{
            marginRight: messageItem.is ? 'auto' : 0,
            marginLeft:messageItem.is?0:'auto'
           }}>
        <span className={styles.time}>{formatedTime}</span>
            <div
              className={styles.messageText}
              style={{
                color:  messageItem.is?'black':'white',
                background: messageItem.is?'#E2E8F0':'palevioletred'
              }}
          >{messageItem.message}
          </div>
        </li>
    
    </Fragment>

    })
 
    return res;
  }, [messages]);



  useEffect(() => {
    scrollDown(ref)
  },[memoMessages, isOpen])
 
      if (!isOpen) return null;
  return (
    <div className={styles.modal}>
      <header className={styles.header}>Admin</header>
      <div  className={styles.chat}>
        
        <ul ref = {ref}  className={styles.messages}>
          {memoMessages}
              {! isLoadingNeeded  && <div>Админ скоро ответит вам...</div>}
        </ul>

        {/* {adminAnswerLoading && <div>Админ скоро ответит вам...</div>} */}
        
        <input value={value} className={styles.input} type="text" placeholder='Message...' onChange={(e) => updateValue(e.target.value)}
          onKeyDown={(e) => {
          if (e.key === 'Enter') sendMessage();
        }} />
        
      </div>
     
      
    </div>
  )
}
