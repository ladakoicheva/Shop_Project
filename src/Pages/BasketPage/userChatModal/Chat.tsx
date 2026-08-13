import { openModal ,closeModal} from '../../../redux/supportChat/support'
import styles from './Chat.module.css'
import { useAppDispatch, useAppSelector } from '../../../redux/type'
import ChatModal from './ChatModal'


export default function Chat() {
  const dispatch = useAppDispatch()
  const { isOpen,isincoming } = useAppSelector((s) => s.support);
  const { user } = useAppSelector((s) => s.auth);
  console.log(isincoming)
 
  if(!user) return null
  return (
    <>
      <ChatModal />
      <div onClick={() => dispatch(!isOpen ? openModal() : closeModal())}>

        <div className={styles.wrapper}>
          {isincoming && <span className={styles.notification}></span>}
      <img className={styles.icon} src="/chat.png" alt="chatIcon" /></div>
      
    </div>
    </>
   
  )
}
// admin
// save to redux 
// get 

// client //!
// save in Chat
// get useEffect local 