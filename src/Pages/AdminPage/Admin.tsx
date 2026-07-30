import useAdminPageLogical from './Logic/useAdminPageLogical';
import styles from './Admin.module.css'
import ChatHistory from './ChatHistory/ChatHistory';
import SupportChat from './SupportChat/SupportChat';

export default function Admin() {


   const{
      inputValue,
      messages,
      // handleKeyDown,
      // sendMessage,
      changeInputValue,
    }= useAdminPageLogical()

  
  
  return (
    <div className={styles.wrapper}>
      <ChatHistory messages = {messages} />
      <SupportChat messages={messages} changeInputValue={changeInputValue} inputValue={inputValue}    />
   </div>
  
   
  )
}




