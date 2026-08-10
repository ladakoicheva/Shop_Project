import { doc,collection, onSnapshot } from "firebase/firestore";
import { APP_DB } from "../index";



export const connectLiveChatAdmin = (callBack) => {
  const link = collection (APP_DB, 'messages');
  const unsubscribe = onSnapshot(link, (snapshot) => {
     snapshot.docChanges().forEach((change) => {
       const data = {
         ...change.doc.data(),
    
    
       };
         
          callBack(change.type, data)
        });
  
  })
  return unsubscribe
}

export const connectLiveChatClient = (callBack,email:string) => {
  const link = doc(APP_DB, 'messages', email);

    const unsubscribe = onSnapshot(link, (doc) => {
      const data = doc.data() 
      callBack(data);
      
    })
    return unsubscribe
  }
