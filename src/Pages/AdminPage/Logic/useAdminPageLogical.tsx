import type { messageDataI } from '../type';
import { useEffect, useState } from 'react';
import { adminSendMessage } from '../../../services/firebase/db/support';
import { connectLiveChatAdmin } from '../../../services/firebase/socket/chat';
import { adminEditMessage } from '../../../services/firebase/db/support';
// import { useAppDispatch } from '../../../redux/type';

export default function useAdminPageLogical() {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<messageDataI>({});
  const [isEditing,setIsEditing]= useState({is:false,time:''})
  // const dispatch = useAppDispatch();


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

  
  const sendMessage = async(email:string) => {
       if (inputValue.trim() === "") return
      const res = await adminSendMessage(email, inputValue);
      
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
      setEdit

    }
  )
}




