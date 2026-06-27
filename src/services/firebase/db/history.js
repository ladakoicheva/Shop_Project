import { v4 as uuidv4 } from "uuid";
import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter, getDoc, updateDoc, where, increment } from "firebase/firestore";
import { APP_DB } from "..";



export const archieveItem = async (uid, purchaseId) => {
  try {
    const docLink = doc(APP_DB, "user", uid, 'history', purchaseId);
     await updateDoc(docLink, { isArchived: true });

    return { ok: true, data: null };

  } catch (e) {
    console.log(e);
    return { ok: false, data: null, e: e };
  }
}

export const getHistoryItem = async (uid, id) => {
  console.log(uid, id)
  try {
    const docLink = doc(APP_DB, "user", uid, 'history', id);
    const res = await getDoc(docLink)
    const data = res.data();
    return { ok: true, data };

  } catch (e) {
    return { ok: false, data: null, e: e };
  }
}

export const saveHistory = async (data, uid) => {
  const id = uuidv4();
  try {
    const docLink = doc(APP_DB, "user", uid, 'history', id);
    await setDoc(docLink, { ...data, id, isArchived: false }, { merge: true });
    return { ok: true, data: data }

  } catch (error) {
    return { ok: false, data: null, e: error }
  }
}



let lastDocState = new Date(0);

export const getHistory = async (uid) => {
  try {
    const docLink = collection(APP_DB, "user", uid, 'history');

    // ----
    // const docQuery = query(
    //   docLink,
    //   orderBy("date", "desc"),
    //   limit(5)
    // );
    console.log('--------------------');

    const docQuery = query(
      docLink,
      where("isArchived", "==", false),
      orderBy("date", "desc"),
      startAfter(lastDocState),
      limit(10)
    );



    const docSnap = await getDocs(docQuery);
    lastDocState = docSnap.docs[docSnap.docs.length - 1];

    const datas = []
    docSnap.docs.forEach((doc) => {
      const data = doc.data()
      if (data) datas.push(data);
    });

    console.log(datas, 'sss');


    return { ok: true, data: datas }

  } catch (error) {
    console.log(error);

    return { ok: false, data: null, e: error }
  }
}


export const updateTotal = async (purchaseTotal, uid) => {
  try {
    const docLink = doc(APP_DB, "user", uid);
    await updateDoc(docLink, { sum: increment(purchaseTotal) });
    return { ok: true, data: null }
  } catch (e) {
    return { ok: false, e: e }
  }


}

export const getTotal = async (uid) => {
  try {
    const docLink = doc(APP_DB, "user", uid);
    const res = await getDoc(docLink);
    const total = res.data().sum
    return { ok: true, data: total };
  } catch (e) {
    return { ok: false, e: e }
  }
}
// [a s d f g h j k l q]
// a s d 
// startAfter(d) (f g h)
