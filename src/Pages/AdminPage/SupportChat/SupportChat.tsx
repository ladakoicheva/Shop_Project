import styles from '../Admin.module.css'
import type { messageDataI } from '../type';
import { useParams } from 'react-router-dom';
import type { Params } from 'react-router-dom';
import { getDateDDMMYYYY } from '../../../utils/getDate';
import { useEffect, useMemo, useRef, useState, } from 'react';
import type { MessageItem } from '../../../redux/supportChat/type';
import { scrollDown } from '../../../utils/scroll';
import { adminReadMessage } from '../../../services/firebase/db/support';
import FileBtn from '../FileBtn';
import '../file.css'



type props = {
  messages:messageDataI
  changeInputValue: (value: string) => void,
  inputValue: string,
  sendMessage :(email:string,file:File|null)=>void
  isEditing: { is: boolean; time: string; },
  setIsEditing:(data:{ is: boolean; time: string; })=>void,
  editMessage: (email: string, message: string, time: string) => void
   deleteMessage: (email: string, message: MessageItem, time: string) => void
  
}




export default function SupportChat({ messages, changeInputValue, inputValue, sendMessage,editMessage,isEditing,setIsEditing ,deleteMessage}: props) {
  
  const params = useParams<Params<string>>();
  const email = params.email || "" as string;
  const ref = useRef(null);
  const [file, setFile] = useState < { imgFile: File , url: string } | null>(null);
  const getFile = (file:{ imgFile: File, url: string}|null) => {
    setFile(file)
  }
  // const {user} = useAppSelector((s)=>s.auth)

  const messagesMemo = useMemo(() => {
    const editMessage = (messageText:string,time:string) => {
      setIsEditing({is:true,time});
      changeInputValue(messageText)

    }
    const mess = {...messages[email]}
    delete mess.isIncoming
    delete mess.isIncomingAdmin
    if (!mess || Object.keys(mess).length == 0) return <div>start messaging...</div>
    
    let currentDate = '';
    const times = Object.keys(mess);
    //@ts-ignore
    times.sort((a: string, b: string) => a - b);
    const showMessages = times.map((time: string) => {
      //@ts-ignore
      const messageItem = mess[time] as MessageItem;
      const date = getDateDDMMYYYY(+time);
      const isNeededDate = date !== currentDate;
      currentDate = date;
      return <li  key={time}>
       
        {isNeededDate && <h2>{currentDate}</h2>}
        
        <div
          onDoubleClick={() => messageItem.is ? editMessage(messageItem.message, time) : null}
          className={messageItem.is ? styles.messageAdmin : styles.messageClient}>
          
          {messageItem.file && <a href={messageItem.file} ><img className={styles.fileImg} src={messageItem.file} alt="image" /></a>}
          {messageItem.message && <div>{messageItem.message}</div>}
          <span className={styles.deleteIcon } onClick={()=>deleteMessage(email,messageItem,time)}>×</span>
        </div>
      </li>
    })
   return showMessages
  }, [email, messages])
  
   useEffect(() => {
     scrollDown(ref);
     if(file) setFile(null)
    },[messagesMemo])

  useEffect(() => {
    adminReadMessage(email);
  },[email,messagesMemo])

  return (
    <div className={styles.supportChat}>
      <h1>{params.email}</h1>
      
      <div  ref={ ref} className={styles.groupWrapper}>
        <ul> {messagesMemo}</ul>
        
      </div>
      
      <div className={styles.messageInput} >
        
          <input
            onChange={(e) => changeInputValue(e.target.value)}
            placeholder='Message...' type="text"
            value={inputValue}
        
          />
            
        <div className={styles.sendBtns}>
          <button onClick={() => isEditing.is ? editMessage(email, inputValue, isEditing.time) : sendMessage(email,file?.imgFile!)}//
        
            className={styles.sendBtn}>Send</button>
          <FileBtn getFile={getFile} url = {file?.url!} />
          
      </div>
        {/* <button onClick={()=>setUploadFile(true)}>+</button> */}
      
      </div>
       
      </div>
  )
}


// даты  //?
//проверка на пустую строку ++
//отображение только при клике. ++( добавить messages в массив зависимостей)
//если сообщений нет выводить текст ++

// Рефакторинг кода 


//  для клиента после отправки смс лоадинг что то типо админ думает и скоро даст ответ  +