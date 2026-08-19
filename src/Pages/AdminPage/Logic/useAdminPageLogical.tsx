import type { messageDataI } from '../type';
import { useEffect, useState } from 'react';
import { adminSendMessage } from '../../../services/firebase/db/support';
import { connectLiveChatAdmin } from '../../../services/firebase/socket/chat';
import { adminEditMessage } from '../../../services/firebase/db/support';
// import { useAppDispatch } from '../../../redux/type';
import { useAppSelector } from '../../../redux/type';
import { adminDeleteMessage } from '../../../services/firebase/db/support';
import type { MessageItem } from '../../../redux/supportChat/type';

export default function useAdminPageLogical() {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<messageDataI>({});
  const [isEditing, setIsEditing] = useState({ is: false, time: '' })
  
  // const dispatch = useAppDispatch();
const {user} = useAppSelector((s)=>s.auth)

  useEffect(() => {
    // const getMessages = async () => {
    //   const res = await adminGetMessages();
    //   console.log(res.ok);
    //   if (res.ok) setMessages(res.data as messageDataI);
    // }
    const callback = (data: messageDataI) => {
      
      setMessages((prev) => {
        return {...prev,...data}
      });
    };
    const unsubscribe = connectLiveChatAdmin(callback);

    return unsubscribe;

    
    
  }, []);

  
  const sendMessage = async (email: string, file: File | null) => {
      
       if (inputValue.trim() === "" && !file) return
      const res = await adminSendMessage(email, inputValue,file,user?.uid! );
      
    if (res.ok) {
        setMessages((prevMessages) => ({
        ...prevMessages,
        [email]: {
        ...(prevMessages[email] || {}),
        ...res.data                     
  }
}));
        setInputValue("");
       
      } 
      
    }
  
  const changeInputValue = (value:string) => {
    setInputValue(value)
  }

  const editMessage = async(email:string,message:string,time:string) => {
    const res = await adminEditMessage(email, message, time);
    if (res.ok) {
      setInputValue('')
      setIsEditing({is:false,time:''})
    }
  }

  const deleteMessage = async (email: string, message: MessageItem, time: string) => {
     await adminDeleteMessage(email, message, time,user?.uid!);
   
  }



  const setEdit = (data:{is:boolean,time:string}) => {
    setIsEditing(data)
  }

  return (
    {
      inputValue,
      messages,
      editMessage,
      isEditing,
      sendMessage,
      changeInputValue,
      setEdit,
       deleteMessage

    }
  )
}




