import { doc, getDocs, getDoc,collection,setDoc,updateDoc,deleteField} from "firebase/firestore";
import { APP_DB } from "..";
import type { messageDataUserI, messageDataI } from "../../../Pages/AdminPage/type";
import { v4 as uuidv4 } from 'uuid';
import { addImgToFirebase } from "./products";
import type { MessageItem } from "../../../redux/supportChat/type";
import { deleteImgFromStore } from "./products";
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

export const adminSendMessage = async (userEmail: string, message: string, file: File | null = null, uid: string) => {
  console.log(file)
  const colRef = doc(APP_DB, "messages", userEmail);
  const time = Date.now()
  const id = uuidv4()
   const dataToSend :messageDataUserI= {
    [time]: {
      is: true,
      message,
      id,
     
    }
  }

  try {
    if (file) {
    const res = await addImgToFirebase(file, id, uid);
    console.log(res)
    const data = res.data as string
    if(res.ok) dataToSend[time]['file'] = data
  }
    await setDoc(colRef, { ...dataToSend, isIncoming: true },{merge:true});
    return { ok: true, data: dataToSend}
   
  } catch (error) {
    const e = error as string
    return {ok:false,data:null,e:e}
  }
  
}

export const adminDeleteMessage = async (userEmail: string, message:MessageItem ,time:string, uid: string) => {
  const docRef = doc(APP_DB, "messages", userEmail );

  try {
    if (message.file) {
    const res = await  deleteImgFromStore(uid,message.id)
      console.log(res)
      if(!res.ok) throw Error('unable to delete img')
  
  }
     await updateDoc(docRef, {
    [time]: deleteField()
});
    
    return { ok: true, data: null }
    
   
  } catch (error) {
    const e = error as string
    return {ok:false,data:null,e:e}
  }
  
}
// export const addImgToFirebase = async (file:any, id:string, uid:string):Promise<ResponseI<string|null>> => {
//   if (file) {
//     try {
//       const link = ref(APP_STORAGE, `${uid}/${id}`);
//       const snapShot = await uploadBytes(link, file)
//       const url = await getDownloadURL(snapShot.ref)
//       return { ok: true, data: url }
//     } catch (e) {
//       const error = e as string
//       return { ok: false, data: null, e: error };
//     }
//   } else {
//     return { ok: true, data: null };
//   }




export const adminReadMessage = async (userEmail: string) => {
  if (!userEmail) return { ok: false, data: null };
  const colRef = doc(APP_DB, "messages", userEmail);
 
  try {
    await setDoc(colRef, { isIncomingAdmin: false }, { merge: true });
    return { ok: true, data: null };
  } catch (error) {
    const e = error as string;
    return { ok: false, data: null, e: e };
  }
};


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


export const clientReadMessage = async (userEmail: string) => {
  if (!userEmail) return { ok: false, data: null };
  const colRef = doc(APP_DB, "messages", userEmail);
 
  try {
    await setDoc(colRef, { isIncoming: false }, { merge: true });
    return { ok: true, data: null };
  } catch (error) {
    const e = error as string;
    return { ok: false, data: null, e: e };
  }
};






// const allFav:QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
    //  docSnap.docs.forEach((doc) => {
    //   const data = doc.data()
    //   if (data.favorites) allFav.push(...data.favorites);
    // });
    // 