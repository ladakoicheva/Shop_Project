import { doc, getDocs, setDoc, arrayUnion, arrayRemove, collection } from "firebase/firestore";
import { APP_DB } from "..";




export const getAllFavProducts = async (uid) => {
  try {
    const colRef = collection(APP_DB, "user", uid, 'favorites');
    const docSnap = await getDocs(colRef);
    const allFav = []
     docSnap.docs.forEach((doc) => {
      const data = doc.data()
      if (data.favorites) allFav.push(...data.favorites);
    });
    return { ok: true, data: allFav }
  } catch (e) {
    return { ok: false, error: e }
    
  }
}


export const addProductToFav = async (uid, ownersUid, productId) => {
  try {
    const link = doc(APP_DB, 'user', uid, 'favorites', ownersUid);
    const data = { favorites: arrayUnion(productId) }
    await await setDoc(link, data, { merge: true });
    return { ok: true, text: 'success' };
  } catch (e) {
    return { ok: false, text: e }
  }
}

export const deleteProductFromFav = async (uid, ownersUid, productId) => {
  try {
    const link = doc(APP_DB, 'user', uid, 'favorites', ownersUid);
    const data = { favorites: arrayRemove(productId) }
    await setDoc(link, data, { merge: true });
    return { ok: true, text: 'success' };
  } catch (e) {
    return { ok: false, text: e }
  }
}