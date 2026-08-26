import useAdminPageLogical from './Logic/useAdminPageLogical';
import styles from './Admin.module.css'
import ChatHistory from './ChatHistory/ChatHistory';
import SupportChat from './SupportChat/SupportChat';
import { useParams } from 'react-router-dom';



export default function Admin() {

  const params = useParams()
  // const {messages} = useAppSelector((s) => s.support);
  // adminGetMessages()
   const {
      inputValue,
      messages,
      editMessage,
      isEditing,
      sendMessage,
      changeInputValue,
      setEdit,
      deleteMessage,
      isAiThinking,
      aiAutoReplyMap,
      toggleAiAutoReply,
      generateAiSuggestion,
    } = useAdminPageLogical()

  
  
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
        deleteMessage={ deleteMessage}
        isAiThinking={isAiThinking}
        isAiAutoReplyEnabled={!!aiAutoReplyMap[params.email]}
        onToggleAiAutoReply={() => toggleAiAutoReply(params.email!)}
        onGenerateAiSuggestion={() => generateAiSuggestion(params.email!)}
        />}
   </div>
  
   
  )
}


// const max = 12;
// const word = 'qweeqweqweq123456789';


// if(word.length>max) console.log(word.slice(0,13)+'...')

