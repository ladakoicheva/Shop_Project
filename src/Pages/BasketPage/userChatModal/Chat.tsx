import { openModal ,closeModal} from '../../../redux/supportChat/support'
import styles from './Chat.module.css'
import { useAppDispatch, useAppSelector } from '../../../redux/type'
import ChatModal from './ChatModal'


export default function Chat() {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector((s) => s.support);
  const { user } = useAppSelector((s) => s.auth);
 

  return (
    <>
     {user?.email && <ChatModal />} 
      <div onClick={() => dispatch( !isOpen ?openModal():closeModal() )}>
      <img className={styles.icon} src="/chat.png" alt="chatIcon" />
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