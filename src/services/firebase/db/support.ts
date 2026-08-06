import { doc, getDocs, getDoc,deleteDoc,collection,setDoc,} from "firebase/firestore";
import { APP_DB } from "..";
import type { messageDataUserI, messageDataI } from "../../../Pages/AdminPage/type";
import { v4 as uuidv4 } from 'uuid';

export const adminGetMessages = async () => {
  const colRef = collection(APP_DB, "messages");
  const messagesObj:messageDataI = {};

  try {
    const res = await getDocs(colRef);
    
    res.docs.forEach((doc) => {
      messagesObj[doc.id] = doc.data();
    });
    console.log(messagesObj)
    return { ok: true, data: messagesObj };
  } catch (error) {
    console.log(error);
    const e = error as string
    return { ok: false, data: null, e: e};
  }



}

export const adminSendMessage = async(userEmail:string,  message:string ) => {
  const colRef = doc(APP_DB, "messages", userEmail);
  const time = Date.now()
  const dataToSend :messageDataUserI= {
    [time]: {
      is: true,
      message,
      id: uuidv4(),
    }
  }
  try {
     await setDoc(colRef,dataToSend,{merge:true});
    return { ok: true, data: dataToSend}
   
  } catch (error) {
    const e = error as string
    return {ok:false,data:null,e:e}
  }
  
}

export const adminDeleteMessages = async (userEmail:string,timeUnix:string) => {
  const docRef = doc(APP_DB, 'messages', userEmail, timeUnix);

    try {
    await deleteDoc(docRef);
  
    return { ok: true, data: null }
    } catch (error) {
    const e = error as string
    return {ok:false,data:null,e:e}
  }

}
    


export const clientGetMessages = async (userEmail:string) => {
    const docLink = doc(APP_DB, "messages",userEmail);
    
  try {
    const res = await getDoc(docLink);
    if (!res.exists()) {
      return { ok: true, data: [] };
    }
    const messageData = res.data() as messageDataUserI

    return { ok: true, data: messageData }
   
  } catch (error) {
    const e = error as string
    return {ok:false,data:null,e:e}
  }

}


export const clientSendMessage = async(userEmail:string,  message:string ) => {
  const colRef = doc(APP_DB, "messages", userEmail);
  const time = Date.now()
  const dataToSend :messageDataUserI= {
    [time]: {
      is: false,
      message,
      id: uuidv4(),
    }
  }
  try {
     await setDoc(colRef,dataToSend,{merge:true});
    return { ok: true, data: dataToSend}
   
  } catch (error) {
    const e = error as string
    return {ok:false,data:null,e:e}
  }
  
}







// const allFav:QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
    //  docSnap.docs.forEach((doc) => {
    //   const data = doc.data()
    //   if (data.favorites) allFav.push(...data.favorites);
    // });
    // 