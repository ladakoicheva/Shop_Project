import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/type";
import { clientGetMessages } from "../../../services/firebase/db/support";
import type { messageDataUserI } from "../../AdminPage/type";
import { clientSendMessage } from "../../../services/firebase/db/support";
import { openAdminLoading } from "../../../redux/supportChat/support";


export default function useUserChatLogical() {
  const { user } = useAppSelector((s) => s.auth)
  const [messages, setMessages] = useState<messageDataUserI>({});
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();

  
   const updateValue =  (newValue: string)=>{
    setValue(newValue);
  }
  
  
  const getMessages = async (email:string) => {
    const res = await clientGetMessages(email);
    if(res.ok) setMessages(res.data as messageDataUserI )
  }
  const sendMessage = async () => {
     if (!user?.email || value.trim() === "") return
    const res = await clientSendMessage(user.email, value);
    
    if (res.ok) { 
      setMessages({ ...messages, ...res.data });
      setValue("");
      dispatch(openAdminLoading())
    } 
    
  }

 

  useEffect(() => {
    if (!user?.email) return
    getMessages(user?.email);
  },[user?.email])

  return (
    {
      messages,
      user,
      value,
      updateValue,
      sendMessage
    }
  )
}
