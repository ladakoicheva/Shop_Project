import { doc,collection, onSnapshot } from "firebase/firestore";
import { APP_DB } from "../index";
import type { messageDataI } from "../../../Pages/AdminPage/type";
import type { messageDataUserI } from "../../../Pages/AdminPage/type";


export const connectLiveChatAdmin = (callBack:(data:messageDataI)=>void) => {
  const link = collection(APP_DB, 'messages');
  const data = {} as messageDataI
  const unsubscribe = onSnapshot(link, (snapshot) => {
    // snapshot.docChanges().forEach((change) => { 
    //   console.log(change, 'change');
    //   console.log(change.doc.data(), 'data');
      
    // })

    snapshot.docChanges().forEach((change) => {
      const doc = change.doc;
      console.log(doc.data(), 'ddddd')
      console.log(doc.id, 'ddddd')
       
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
