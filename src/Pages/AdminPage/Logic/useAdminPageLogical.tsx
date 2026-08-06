import type { messageDataI } from '../type';
import { useEffect, useState } from 'react';
import { adminSendMessage } from '../../../services/firebase/db/support';
import { adminGetMessages } from '../../../services/firebase/db/support';


export default function useAdminPageLogical() {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<messageDataI>({})

  useEffect(() => {
    const getMessages = async () => {
      const res = await adminGetMessages();
      console.log(res.ok);
      if (res.ok) setMessages(res.data as messageDataI);
    }

    getMessages();
    console.log('start');
    
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




