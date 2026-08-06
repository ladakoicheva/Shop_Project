import styles from '../Admin.module.css'
import type { messageDataI } from '../type';
import { useParams } from 'react-router-dom';
import type { Params } from 'react-router-dom';
import { getDateDDMMYYYY } from '../../../utils/getDate';
import { useMemo, } from 'react';

type props = {
  messages:messageDataI
  changeInputValue: (value: string) => void,
  inputValue: string,
  sendMessage :(email:string)=>void
 
}




export default function SupportChat({ messages, changeInputValue, inputValue, sendMessage }: props) {

  const params = useParams<Params<string>>();
  const email = params.email || "" as string;
  

 
  const messagesMemo = useMemo(() => {
    const mess = messages[email]
    if (!mess ) return <div>start messaging...</div>
    const messageArr = Object.entries(mess);
    
   const showMessages = [] 
   let currentDate = '';
   for (let index = 0; index < messageArr.length; index++) {
     const [time, messageItem] = messageArr[index];
     const date = getDateDDMMYYYY(+time)
    
     const isNeededDate = date !== currentDate 
     currentDate = date
     
    showMessages.push(<li key={time}>
       
      {isNeededDate && <h2>{currentDate}</h2> }
       <span style={{
      backgroundColor:messageItem.is? '#80C56B': '#bf91d1',
      marginLeft: messageItem.is ? 'auto ' : 0,
      marginRight: messageItem.is ? 0 : 'auto ',
} } className={styles.message}>{messageItem.message}</span>
      </li>)
   }
   return showMessages
},[email,messages])


  return (
    <div className={styles.supportChat}>
      <h1>{params.email}</h1>
      
      <div className={styles.groupWrapper}>
        <ul> {messagesMemo}</ul>
        
      </div>
      
      <div className={styles.messageInput} >
        
          <input
            onChange={(e) => changeInputValue(e.target.value)}
            placeholder='Message...' type="text"
            value={inputValue}
        
          />
            
        <button onClick={() => sendMessage(email)} className={styles.sendBtn}>Send</button></div>
      </div>
  )
}


// даты  //?
//проверка на пустую строку ++
//отображение только при клике. ++( добавить messages в массив зависимостей)
//если сообщений нет выводить текст ++

// Рефакторинг кода


//  для клиента после отправки смс лоадинг что то типо админ думает и скоро даст ответ  +