import { doc, getDocs, getDoc,collection,setDoc,updateDoc} from "firebase/firestore";
import { APP_DB } from "..";
import type { messageDataUserI, messageDataI } from "../../../Pages/AdminPage/type";
import { v4 as uuidv4 } from 'uuid';

//--------------аdmin---------------------

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
    await setDoc(colRef, { ...dataToSend, isIncoming: true },{merge:true});
    return { ok: true, data: dataToSend}
   
  } catch (error) {
    const e = error as string
    return {ok:false,data:null,e:e}
  }
  
}

export const adminReadMessage = async(userEmail:string) => {
  const colRef = doc(APP_DB, "messages", userEmail);
 
  try {
    await updateDoc(colRef, { isIncomingAdmin:false});
    return { ok: true, data: null}
   
  } catch (error) {
    const e = error as string
    return {ok:false,data:null,e:e}
  }
  
}


export const adminEditMessage = async(userEmail:string,  message:string ,time:string) => {
  const colRef = doc(APP_DB, "messages", userEmail);
  

  try {
    await setDoc(colRef, { [time]: { message } },{merge:true});
    return { ok: true, data: null}
   
  } catch (error) {
    const e = error as string
    return {ok:false,data:null,e:e}
  }
  
}
    
//--------------------client---------------------------

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
    await setDoc(colRef, {
      ...dataToSend,
      isIncoming: false,
      isIncomingAdmin:true,
    }, { merge: true });
    return { ok: true, data: dataToSend}
   
  } catch (error) {
    const e = error as string
    return {ok:false,data:null,e:e}
  }
  
}


export const clientReadMessage = async(userEmail:string) => {
  const colRef = doc(APP_DB, "messages", userEmail);
 
  try {
    await updateDoc(colRef, { isIncoming:false});
    return { ok: true, data: null}
   
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