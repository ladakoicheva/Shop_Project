import styles from '../Admin.module.css'
import type { messageDataI } from '../type';
import { useParams } from 'react-router-dom';
import type { Params } from 'react-router-dom';
import { getDateDDMMYYYY } from '../../../utils/getDate';
import { useMemo } from 'react';

type props = {
  messages:messageDataI
  changeInputValue: (value: string) => void,
  inputValue: string

 
}


export default function SupportChat({ messages, changeInputValue, inputValue }: props) {
  const params = useParams<Params<string>>();
  const email = params.email as string;
  const messageArr = Object.entries(messages[email]);
 
 const messagesMemo = useMemo(() => {
   const messages = [];
   let currentDate = '';
   for (let index = 0; index < messageArr.length; index++) {
     const [time, messageItem] = messageArr[index];
     const date = getDateDDMMYYYY(+time)
    
     const isNeededDate = date === currentDate ? false : true
     currentDate = getDateDDMMYYYY(+time);
     
     messages.push(<li key={time}>
      {isNeededDate ? <h2>{currentDate}</h2> :null}
       <span style={{
      backgroundColor:messageItem.is? '#80C56B': '#bf91d1',
      marginLeft: messageItem.is ? 'auto ' : 0,
      marginRight: messageItem.is ? 0 : 'auto ',
} } className={styles.message}>{messageItem.message}</span>
      </li>)
   }
   return messages
},[messageArr])


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
            
          <button className={styles.sendBtn}>Send</button></div>
      </div>
  )
}
