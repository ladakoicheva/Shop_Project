import { doc, getDocs, setDoc, arrayUnion, arrayRemove, collection ,type DocumentData,QueryDocumentSnapshot} from "firebase/firestore";
import { APP_DB } from "..";
import type { favI } from "../../../../types/types";
import type { ResponseI } from "../../../../types/types";


export const getAllFavProducts = async (uid:string):Promise<ResponseI<DocumentData>> => {
  try {
    const colRef = collection(APP_DB, "user", uid, 'favorites');
    const docSnap = await getDocs(colRef);
    const allFav:QueryDocumentSnapshot<DocumentData, DocumentData>[] = []
     docSnap.docs.forEach((doc) => {
      const data = doc.data()
      if (data.favorites) allFav.push(...data.favorites);
    });
    return { ok: true, data: allFav }
  } catch (e: any) {
      const error = e as string
    return { ok: false, e: error }
    
  }
}


export const addProductToFav = async (uid:string, ownersUid:string, productId:string):Promise<ResponseI<null>> => {
  try {
    const link = doc(APP_DB, 'user', uid, 'favorites', ownersUid);
    const data = { favorites: arrayUnion(productId) }
    await await setDoc(link, data, { merge: true });
    return { ok: true, data:null};
  } catch (e) {
    const error = e as string
    return { ok: false, data:null,e:error }
  }
}

export const deleteProductFromFav = async (uid:string, ownersUid:string, productId:string):Promise<ResponseI<favI[]|null>> => {
  try {
    const link = doc(APP_DB, 'user', uid, 'favorites', ownersUid);
    const data = { favorites: arrayRemove(productId) }
    await setDoc(link, data, { merge: true });
    return { ok: true, data: null };
  } catch (e) {
    const error = e as string
    return { ok: false, e: error }
  }
}