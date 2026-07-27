import useAdminPageLogical from './useAdminPageLogical';
import styles from './Admin.module.css'
import ChatHistory from './ChatHistory/ChatHistory';
import SupportChat from './SupportChat/SupportChat';

export default function Admin() {


   const{
      inputValue,
      messages,
      handleKeyDown,
      sendMessage,
      changeInputValue,
    }= useAdminPageLogical()

  const messagesArr = Object.entries(messages);
  
  return (
    <div className={styles.wrapper}>
      <ChatHistory />
      <SupportChat messagesArr={messagesArr } changeInputValue={changeInputValue} inputValue={inputValue} handleKeyDown ={handleKeyDown}   sendMessage={ sendMessage} />
   </div>
  
   
  )
}




