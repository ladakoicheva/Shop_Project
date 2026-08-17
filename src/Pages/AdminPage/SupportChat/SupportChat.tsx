import styles from '../Admin.module.css'
import type { messageDataI } from '../type';
import { useParams } from 'react-router-dom';
import type { Params } from 'react-router-dom';
import { getDateDDMMYYYY } from '../../../utils/getDate';
import { useEffect, useMemo, useRef, } from 'react';
import type { MessageItem } from '../../../redux/supportChat/type';
import { scrollDown } from '../../../utils/scroll';
import { adminReadMessage } from '../../../services/firebase/db/support';
import { adminEditMessage } from '../../../services/firebase/db/support';
import { useState } from 'react';

type props = {
  messages:messageDataI
  changeInputValue: (value: string) => void,
  inputValue: string,
  sendMessage :(email:string)=>void
  isEditing: { is: boolean; time: string; },
  setIsEditing:(data:{ is: boolean; time: string; })=>void,
  editMessage: (email: string, message: string, time: string) => void
  
}




export default function SupportChat({ messages, changeInputValue, inputValue, sendMessage,editMessage,isEditing,setIsEditing }: props) {
  
  const params = useParams<Params<string>>();
  const email = params.email || "" as string;
  const ref = useRef(null);
  // const [isEditing,setIsEditing]= useState({is:false,time:''})
  

  const messagesMemo = useMemo(() => {
    const editMessage = (messageText:string,time:string) => {
      setIsEditing({is:true,time});
      changeInputValue(messageText)

    }
    const mess = {...messages[email]}
    delete mess.isIncoming
    delete mess.isIncomingAdmin
    if (!mess || Object.keys(mess).length == 0) return <div>start messaging...</div>
    
    let currentDate = '';
    const times = Object.keys(mess);
    //@ts-ignore
    times.sort((a: string, b: string) => a - b);
    const showMessages = times.map((time: string) => {
      //@ts-ignore
      const messageItem = mess[time] as MessageItem;
      const date = getDateDDMMYYYY(+time);
      const isNeededDate = date !== currentDate;
      currentDate = date;
      return <li  key={time}>
       
      {isNeededDate && <h2>{currentDate}</h2> }
        <span
          onDoubleClick={() => messageItem.is ? editMessage(messageItem.message, time) : null}
          className={messageItem.is ? styles.messageAdmin : styles.messageClient}>
          {messageItem.message}
        </span>
      </li>
    })
   return showMessages
  }, [email, messages])
  
   useEffect(() => {
      scrollDown(ref);
    },[messagesMemo])

  useEffect(() => {
    adminReadMessage(email);
  },[email,messagesMemo])

  return (
    <div className={styles.supportChat}>
      <h1>{params.email}</h1>
      
      <div  ref={ ref} className={styles.groupWrapper}>
        <ul> {messagesMemo}</ul>
        
      </div>
      
      <div className={styles.messageInput} >
        
          <input
            onChange={(e) => changeInputValue(e.target.value)}
            placeholder='Message...' type="text"
            value={inputValue}
        
          />
            
        <button onClick={() => isEditing.is ?editMessage(email,inputValue,isEditing.time):sendMessage(email)}
        className={styles.sendBtn}>Send</button></div>
      </div>
  )
}


// даты  //?
//проверка на пустую строку ++
//отображение только при клике. ++( добавить messages в массив зависимостей)
//если сообщений нет выводить текст ++

// Рефакторинг кода 


//  для клиента после отправки смс лоадинг что то типо админ думает и скоро даст ответ  +