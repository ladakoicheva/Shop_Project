import type { messageDataI } from '../type';
import { useEffect, useState } from 'react';
import { adminSendMessage } from '../../../services/firebase/db/support';
import { connectLiveChatAdmin } from '../../../services/firebase/socket/chat';
import { useAppDispatch } from '../../../redux/type';

export default function useAdminPageLogical() {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<messageDataI>({})
  const dispatch = useAppDispatch();


  useEffect(() => {
    // const getMessages = async () => {
    //   const res = await adminGetMessages();
    //   console.log(res.ok);
    //   if (res.ok) setMessages(res.data as messageDataI);
    // }
    const callback = (data: messageDataI) => {
      setMessages(data);
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

  return (
    {
      inputValue,
      messages,
      // handleKeyDown,
      sendMessage,
      changeInputValue,
      

    }
  )
}




