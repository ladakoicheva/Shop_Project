import useAdminPageLogical from './Logic/useAdminPageLogical';
import styles from './Admin.module.css'
import ChatHistory from './ChatHistory/ChatHistory';
import SupportChat from './SupportChat/SupportChat';
import { useAppSelector } from '../../redux/type';



export default function Admin() {
  const {isincoming} = useAppSelector((s)=>s.support)
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

  console.log(messages)
  console.log(isincoming)
  
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

