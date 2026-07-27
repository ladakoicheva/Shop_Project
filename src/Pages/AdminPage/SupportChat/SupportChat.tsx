import styles from '../Admin.module.css'
import MessagesGroup from './MessagesGroup';
import type { MessageItem } from '../type';

type props = {
  messagesArr: [string, MessageItem[]][]
  changeInputValue: (value: string) => void,
  inputValue: string
  handleKeyDown: (e: React.KeyboardEvent) => void
   sendMessage:(textMessage:string)=>void
}


export default function SupportChat({ messagesArr, changeInputValue, inputValue, handleKeyDown, sendMessage }: props) {
  
  return (
    <div className={styles.supportChat}>
        { messagesArr.map((messageData) => {
          const date = messageData[0];
          const messagesArr = messageData[1]
          return <MessagesGroup key={ date} date={date} messagesArr = {messagesArr} />
        })}
        <div className={styles.messageInput} >
          <input
            onChange={(e) => changeInputValue(e.target.value)}
            placeholder='Message...' type="text"
            value={inputValue}
            onKeyDown={handleKeyDown}
          />
            
          <button onClick={()=> sendMessage(inputValue)}>send</button></div>
      </div>
  )
}
