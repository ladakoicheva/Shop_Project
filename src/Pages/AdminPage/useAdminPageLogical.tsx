import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import type { MessageItem } from './type';
import type { messageDataI } from './type';

export default function useAdminPageLogical() {
    const [inputValue, setInputValue] = useState<string>('');
    const [messages, setMessages] = useState<messageDataI >({
      '28.08.2026': [
         { time: '17:08', message: 'hi' ,id:'dddd'}
      ]
       
    })

      const handleKeyDown = (e:React.KeyboardEvent) => {
    if (e.key === 'Enter') {
     
      sendMessage(inputValue)
    }
  };
  const sendMessage = (value: string) => {
      if(!value)return
  
    const messageData: MessageItem = {
          time: new Date().toLocaleTimeString(),
          message: value,
          id: uuidv4()
    }
   setMessages((prev) => {
      const existingDateMessages = prev[new Date().toLocaleDateString()] || [];
      return {
        ...prev,
        [new Date().toLocaleDateString()]: [...existingDateMessages, messageData] 
      };
   });
    setInputValue('')

  }
  const changeInputValue = (value:string) => {
    setInputValue(value)
  }

  return (
    {
      inputValue,
      messages,
      handleKeyDown,
      sendMessage,
      changeInputValue,
      

    }
  )
}
