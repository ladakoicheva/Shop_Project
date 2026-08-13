import styles from '../Admin.module.css'
import type { messageDataI } from '../type';
import { useParams } from 'react-router-dom';
import type { Params } from 'react-router-dom';
import { getDateDDMMYYYY } from '../../../utils/getDate';
import { useEffect, useMemo, useRef, } from 'react';
import type { MessageItem } from '../../../redux/supportChat/type';
import { scrollDown } from '../../../utils/scroll';

type props = {
  messages:messageDataI
  changeInputValue: (value: string) => void,
  inputValue: string,
  sendMessage :(email:string)=>void
 
}




export default function SupportChat({ messages, changeInputValue, inputValue, sendMessage }: props) {
  
  const params = useParams<Params<string>>();
  const email = params.email || "" as string;
  const ref = useRef(null);

  

  const messagesMemo = useMemo(() => {
    const mess = messages[email]
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
      return <li key={time}>
       
      {isNeededDate && <h2>{currentDate}</h2> }
       <span style={{
      backgroundColor:messageItem.is? '#80C56B': '#bf91d1',
      marginLeft: messageItem.is ? 'auto ' : 0,
      marginRight: messageItem.is ? 0 : 'auto ',
} } className={styles.message}>{messageItem.message}</span>
      </li>
    })
   return showMessages
  }, [email, messages])
  
   useEffect(() => {
      scrollDown(ref);
    },[messagesMemo])


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
            
        <button onClick={() => sendMessage(email)}
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