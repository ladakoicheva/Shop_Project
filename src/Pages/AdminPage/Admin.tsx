import useAdminPageLogical from './Logic/useAdminPageLogical';
import styles from './Admin.module.css'
import ChatHistory from './ChatHistory/ChatHistory';
import SupportChat from './SupportChat/SupportChat';
import { useAppSelector } from '../../redux/type';
import { useParams } from 'react-router-dom';



export default function Admin() {
  const {isincoming} = useAppSelector((s)=>s.support)
  const params = useParams()
  // const {messages} = useAppSelector((s) => s.support);
  // adminGetMessages()
   const{
      inputValue,
      messages,
      editMessage,
      isEditing,
      sendMessage,
     changeInputValue,
      setEdit,
    }= useAdminPageLogical()

  console.log(messages)
  console.log(isincoming)
  
  return (
    <div className={styles.wrapper}>
      <ChatHistory messages = {messages} />
      {params.email &&
        <SupportChat
          messages={messages}
        changeInputValue={changeInputValue}
        inputValue={inputValue}
        editMessage={editMessage}
        isEditing={isEditing}
        setIsEditing = {setEdit}
          sendMessage={sendMessage}
        />}
   </div>
  
   
  )
}


// const max = 12;
// const word = 'qweeqweqweq123456789';


// if(word.length>max) console.log(word.slice(0,13)+'...')

