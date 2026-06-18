import { v4 as uuidv4 } from "uuid";
import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter } from "firebase/firestore";
import { APP_DB } from "..";



export const saveHistory = async (data, uid) => {
  const id = uuidv4();
  try {
    const docLink = doc(APP_DB, "user", uid, 'history', id);
    await setDoc(docLink, data, { merge: true });
    return { ok: true, data: data }

  } catch (error) {
    return { ok: false, data: null, e: error }
  }
}

export const getHistory = async (uid,lastDoc) => {
  try {
    const docLink = collection(APP_DB, "user", uid, 'history');

    // ----
    const docQuery = query(
      docLink,
      orderBy("date", "desc"),
      limit(5)
    );

    const docSnap = await getDocs(docQuery);
    const lastDoc = docSnap.docs[docSnap.docs.length - 1];

    const datas = []
    const productsList = docSnap.docs.forEach((doc) => {
      const data = doc.data()
      if (data) datas.push(data);
    });

    return { ok: true, data: datas, lastDoc: lastDoc }

  } catch (error) {
    return { ok: false, data: null, e: error }
  }
}
// [a s d f g h j k l q]
// a s d 
// startAfter(d) (f g h)

export const getNext = async (uid ,lastDocState) => {
  try {
    const docLink = collection(APP_DB, "user", uid, 'history');

    // ----
    const docQuery = query(
      docLink,
      orderBy("date", "desc"),
      startAfter(lastDocState),
      limit(5)
    );
 
    const docSnap = await getDocs(docQuery);
    const lastDoc = docSnap.docs[docSnap.docs.length - 1];

    const datas = []
    const productsList = docSnap.docs.forEach((doc) => {
      const data = doc.data()
      if (data) datas.push(data);
    });

    return { ok: true, data: datas, lastDoc: lastDoc }

  } catch (error) {
    return { ok: false, data: null, e: error }
  }
}