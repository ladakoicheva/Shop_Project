import useAdminPageLogical from './Logic/useAdminPageLogical';
import styles from './Admin.module.css'
import ChatHistory from './ChatHistory/ChatHistory';
import SupportChat from './SupportChat/SupportChat';



export default function Admin() {
  console.log('render admin page')
  // const {messages} = useAppSelector((s) => s.support);
  // adminGetMessages()
   const{
      inputValue,
      messages,
      // handleKeyDown,
      sendMessage,
      changeInputValue,
    }= useAdminPageLogical()

  
  
  return (
    <div className={styles.wrapper}>
      <ChatHistory messages = {messages} />
      <SupportChat messages={messages} changeInputValue={changeInputValue} inputValue={inputValue} sendMessage = {sendMessage} />
   </div>
  
   
  )
}


// const max = 12;
// const word = 'qweeqweqweq123456789';


// if(word.length>max) console.log(word.slice(0,13)+'...')

