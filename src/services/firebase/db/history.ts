import type { ResponseI } from "../../../../types/types";
import type { historyI } from "../../../../types/types";
import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, getDoc, updateDoc, where, increment, QueryDocumentSnapshot, type DocumentData } from "firebase/firestore";
import { APP_DB } from "..";



export const archieveItem = async (uid:string, purchaseId:string):Promise<ResponseI<null>> => {
  try {
    const docLink = doc(APP_DB, "user", uid, 'history', purchaseId);
     await updateDoc(docLink, { isArchived: true });

    return { ok: true, data: null };

  } catch (e) {
    const error = e as string
    return { ok: false, data: null, e: error };
  }
}

export const getHistoryItem = async (uid: string, id: string): Promise<ResponseI<historyI | null>> => {
  try {
    const docLink = doc(APP_DB, "user", uid, 'history', id);
    const res = await getDoc(docLink)
    const data = res.data() as historyI;
    return { ok: true, data };

  } catch (e) {
     const error = e as string
    return { ok: false, data: null, e: error};
  }
}

export const saveHistory = async (data:historyI, uid:string,id:string): Promise<ResponseI<historyI | null>> => {
  
  try {
    const docLink = doc(APP_DB, "user", uid, 'history',id);
    await setDoc(docLink, data, { merge: true });
    console.log(data)
    return { ok: true, data }

  } catch (e) {
    console.log(e)
    const error = e as string
    return { ok: false, data: null, e: error }
  }
}



let lastDocState : Date | QueryDocumentSnapshot<DocumentData, DocumentData> = new Date(0);

export const getHistory = async (uid:string): Promise<ResponseI<historyI[] | null>> => {
  try {
    const docLink = collection(APP_DB, "user", uid, 'history');

    // ----
    // const docQuery = query(
    //   docLink,
    //   orderBy("date", "desc"),
    //   limit(5)
    // );
  

    const docQuery = query(
      docLink,
      where("isArchived", "==", false),
      orderBy("date", "desc"),
      startAfter(lastDocState),
      limit(10)
    );



    const docSnap = await getDocs(docQuery);
    lastDocState = docSnap.docs[docSnap.docs.length - 1];

    const datas: historyI[] = []
    
    docSnap.docs.forEach((doc) => {
      const data = doc.data() as historyI
      if (data) datas.push(data);
    });



    return { ok: true, data: datas }

  } catch (e) {
    const error = e as string
    return { ok: false, data: null, e: error }
  }
}


export const updateTotal = async (purchaseTotal:number, uid:string): Promise<ResponseI<null>> => {
  try {
    const docLink = doc(APP_DB, "user", uid);

    await setDoc(docLink, { sum: increment(+purchaseTotal) },{merge:true});
    return { ok: true, data: null }
  } catch (e) {
     const error = e as string
    return { ok: false, data:null,e: error }
  }

}//!округлить


// [a s d f g h j k l q]
// a s d 
// startAfter(d) (f g h)

// UAH = 1       x
// USD = 0.22   50


// 50 UAH    UAH * USD = USD 
// 50 USD    USD / UAH = UAH 
