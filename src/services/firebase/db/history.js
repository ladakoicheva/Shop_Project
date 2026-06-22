import { v4 as uuidv4 } from "uuid";
import { collection, doc, getDocs, limit, orderBy, query, setDoc, startAfter,getDoc } from "firebase/firestore";
import { APP_DB } from "..";




export const getHistoryItem = async (uid, id) => {
  console.log(uid,id)
  try {
    const docLink = doc(APP_DB, "user", uid, 'history', id);
    const res = await getDoc(docLink)
    const data = res.data();
    return { ok: true, data };

  } catch(e) {
    return { ok: false, data: null, e: e };
  }
}

export const saveHistory = async (data, uid) => {
  const id = uuidv4();
  try {
    const docLink = doc(APP_DB, "user", uid, 'history', id);
    await setDoc(docLink, { ...data, id }, { merge: true });
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

    const docQuery = query(
      docLink,
      orderBy("date", "desc"),
      startAfter(lastDocState),
      limit(5)
    );



    const docSnap = await getDocs(docQuery);
    lastDocState = docSnap.docs[docSnap.docs.length - 1];

    const datas = []
    const productsList = docSnap.docs.forEach((doc) => {
      const data = doc.data()
      if (data) datas.push(data);
    });

    console.log(datas, 'sss');


    return { ok: true, data: datas }

  } catch (error) {
    return { ok: false, data: null, e: error }
  }
}
// [a s d f g h j k l q]
// a s d 
// startAfter(d) (f g h)
