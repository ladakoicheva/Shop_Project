import { doc,collection, onSnapshot } from "firebase/firestore";
import { APP_DB } from "../index";
import type { messageDataI } from "../../../Pages/AdminPage/type";
import type { messageDataUserI } from "../../../Pages/AdminPage/type";


export const connectLiveChatAdmin = (callBack:(data:messageDataI)=>void) => {
  const link = collection(APP_DB, 'messages');
  const data = {} as messageDataI
  const unsubscribe = onSnapshot(link, (snapshot) => {
     snapshot.docs.forEach((doc) => {
       
        data[doc.id]= {...doc.data(),}
          callBack( data)
        });
  
  })
  return unsubscribe
}

export const connectLiveChatClient = (callBack:(data:messageDataUserI)=>void,email:string) => {
  const link = doc(APP_DB, 'messages', email);

    const unsubscribe = onSnapshot(link, (doc) => {
      const data = doc.data() as messageDataUserI; 
      callBack(data);
      
    })
    return unsubscribe
  }
