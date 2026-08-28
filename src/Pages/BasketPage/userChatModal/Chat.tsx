import { openModal ,closeModal} from '../../../redux/supportChat/support'
import styles from './Chat.module.css'
import { useAppDispatch, useAppSelector } from '../../../redux/type'
import ChatModal from './ChatModal'


export default function Chat() {
  const dispatch = useAppDispatch()
  const { isOpen,isincoming } = useAppSelector((s) => s.support);
  const { user } = useAppSelector((s) => s.auth);

 
  if(!user) return null
  return (
    <>
      <ChatModal />
      <div onClick={() => dispatch(!isOpen ? openModal() : closeModal())}>

        <div className={styles.wrapper} title="Support Chat">
          {isincoming && <span className={styles.notification}></span>}
          <svg className={styles.chatSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
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