import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/type";
import type { messageDataUserI } from "../../AdminPage/type";
import { clientSendMessage } from "../../../services/firebase/db/support";
import { connectLiveChatClient } from "../../../services/firebase/socket/chat";
import { setIsIncoming } from "../../../redux/supportChat/support";
import { useMemo } from "react";
import { scrollDown } from "../../../utils/scroll";
import { Fragment } from "react";
import { getDateDDMMYYYY } from "../../../utils/getDate";
import { formatTime } from "../../../utils/formatTime";
import { useRef } from "react";
import styles from './Chat.module.css';
import { readMessage } from "../../../redux/supportChat/support";

export default function useUserChatLogical() {
  const { user } = useAppSelector((s) => s.auth)
  const [messages, setMessages] = useState<messageDataUserI>({});
  const [messageToSend, setMessageToSend] = useState<string>("");
  const {isOpen} = useAppSelector((s)=>s.support)
  const dispatch = useAppDispatch();
  const ref = useRef(null)
  
   const updateValue =  (newValue: string)=>{
    setMessageToSend(newValue);
  }
  
  
  // const getMessages = async (email:string) => {
  //   const res = await clientGetMessages(email);
  //   if(res.ok) setMessages(res.data as messageDataUserI )
  // }
  const sendMessage = async () => {
    const userEmail = user?.email!;
     if (!userEmail || !messageToSend.trim() ) return
    const res = await clientSendMessage(userEmail, messageToSend);
    
    if (res.ok) { 
      setMessages({ ...messages, ...res.data });
      setMessageToSend("");
    
    } 
    
  }

 

  useEffect(() => {
    if (!user?.email) return
    
    const callback = (data: messageDataUserI) => {
      
      // const messagesArr = Object.values(data);
      // const length = messagesArr.length;
      // const getLS = localStorage.getItem('lastMessage') as string
      // const lastMessage = messagesArr[length - 1];
      // const lastMessageLS = JSON.parse(getLS);
    
      if (data.isIncoming) dispatch(setIsIncoming());
      delete data.isIncoming;
      delete data.isIncomingAdmin
      
      setMessages(data);

      if(length === 0) return
     
      
      // if (lastMessageLS && lastMessageLS.id === lastMessage.id) return;
        //  if (lastMessage.is) dispatch(setIsIncoming());

     


     
      
    }

    const unsubscribe = connectLiveChatClient(callback, user?.email);
    return unsubscribe;
  }, [user?.email])
  
 const memoMessages = useMemo(() => {

    const times = Object.keys(messages);
          //@ts-ignore
    times.sort((a: string, b: string) => a - b);
    let currentDate = '';
     const showMessages = () => {
      const res = times.map((time) => {
      //@ts-ignore
      const messageItem = messages[time]
    
      const date = getDateDDMMYYYY(+time);
      const formatedTime = formatTime(+time);
      const isNeededDate = date !== currentDate;
      currentDate = date;

      return (
        
        <Fragment key={time}>

          {isNeededDate && <div className={styles.date}>{date}</div>}
          
        <li className={styles.message} style={{
          marginRight: messageItem.is ? 'auto' : 0,
          marginLeft: messageItem.is ? 0 : 'auto'
        }}>
          <span className={styles.time}>{formatedTime}</span>
          <div
            className={messageItem.is ?
              styles.messageTextAdmin :
              styles.messageTextClient
              
            }
          
          >{messageItem.message}
          </div>
        </li>
    
      </Fragment>
      )
      })
      return res
    }
    if (times.length === 0) return  <div> No messages...  </div >;
    
    return showMessages();
  }, [messages]);



  const isLoadingNeeded = useMemo(() => {

    const arr = Object.keys(messages);
    //@ts-ignore
    arr.sort((a,b)=>a-b)
    const key = arr[arr.length-1]
    if (arr.length === 0) return false

    return messages[key].is
  },[messages])



  useEffect(() => {
    scrollDown(ref)
    if (isOpen) {
      // clientReadMessage(user?.email!);
      // dispatch(setNotIsIncoming())
      // console.log('close in');
      dispatch(readMessage())
      
    }
  },[memoMessages, isOpen])
 

  // useEffect(() => {

  // const datas = Object.keys(messages);
  // const l = datas.length
  // const date = datas[l - 1];
  // const lastMessage = messages[date];
    
    
  //   if(!isOpen) return 
  //   if (l === 0) return;
  //   //@ts-ignore
  //   datas.sort((a,b)=> a - b)

  //   localStorage.setItem('lastMessage', JSON.stringify({ ...lastMessage, date}))

    
  // }, [isOpen, messages])
  

  return (
    {
      ref,
      memoMessages,
      isLoadingNeeded,
      // messages,
      // user,
      messageToSend,
      updateValue,
      sendMessage
    }
  )
}
