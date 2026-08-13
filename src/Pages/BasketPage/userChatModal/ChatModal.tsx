import styles from './Chat.module.css'
import {  useAppDispatch, useAppSelector } from '../../../redux/type'
import useUserChatLogical from './useUserChatLogical'


export default function ChatModal() {
  const dispatch = useAppDispatch()
  const { isOpen} = useAppSelector((s) => s.support)
  const {
      ref,
      memoMessages,
      isLoadingNeeded,
      messageToSend,
      updateValue,
      sendMessage
    } = useUserChatLogical();
  
 

  if (!isOpen) return null;
 
  return (

    <div className={styles.modal}>

      <header className={styles.header}>Admin</header>
      <div  className={styles.chat}>
        
        <ul ref = {ref}  className={styles.messages}>
          {memoMessages}
              {! isLoadingNeeded  && <div>Админ скоро ответит вам...</div>}
        </ul>

        {/* {adminAnswerLoading && <div>Админ скоро ответит вам...</div>} */}
        
        <input value={messageToSend} className={styles.input} type="text" placeholder='Message...' onChange={(e) => updateValue(e.target.value)}
          onKeyDown={(e) => {
          if (e.key === 'Enter') sendMessage();
        }} />
        
      </div>
     
      
    </div>
  )
}
