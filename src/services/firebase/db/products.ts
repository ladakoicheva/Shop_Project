import { doc, getDocs, getDoc, setDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { APP_DB, APP_STORAGE } from "../index";
import type { productI } from "../../../../types/types";
import type { ResponseI } from "../../../../types/types";

//?
export const addProduct = async (product:productI, file:any, uid:string):Promise<ResponseI<productI|null>> => {
  try {
    const id = uuidv4()

    const responsrFile = await addImgToFirebase(file, id, uid)
    if (!responsrFile.ok) return { ok: false, data: null }

    const docLink = doc(APP_DB, 'user', uid, 'products', id)
    const data = { ...product, id, img: responsrFile.data } as productI
    await setDoc(docLink, data)
    return { ok: true, data: data }


  } catch (e) {
    const error = e as string
    return { ok: false, data: null ,e:error}
  }

}



export const addImgToFirebase = async (file:any, id:string, uid:string):Promise<ResponseI<string|null>> => {
  if (file) {
    try {
      const link = ref(APP_STORAGE, `${uid}/${id}`);
      const snapShot = await uploadBytes(link, file)
      const url = await getDownloadURL(snapShot.ref)
      return { ok: true, data: url }
    } catch (e) {
      const error = e as string
      return { ok: false, data: null, e: error };
    }
  } else {
    return { ok: true, data: null };
  }


}

export const deleteImgFromStore = async (uid:string, id:string):Promise<ResponseI<null>> => {
  try {
    const link = ref(APP_STORAGE, `${uid}/${id}`);
    await deleteObject(link)
    return { ok: true, data: null };
  } catch (e) {
    const error = e as string
    return { ok: false, e: error }
  }


}





export const getAllProducts = async (uid:string):Promise<ResponseI<productI[]>> => {
  try {
    const colRef = collection(APP_DB, "user", uid, 'products');
    const docSnap = await getDocs(colRef);
    const productsList = docSnap.docs.map(doc => ({
      ...doc.data()
    })) as productI[]





    return { ok: true, data: productsList }
  } catch (e) {
     const error = e as string
    return { ok: false, e: error }
  }
}


export const getOneProduct = async (uid:string, id:string):Promise<ResponseI<productI>> => {
  const docLink = doc(APP_DB, 'user', uid, 'products', id);
  try {
    const colRef = docLink
    const docSnap = await getDoc(colRef);
    const data = docSnap.data() as productI

    return { ok: true, data:data  }
  } catch (e) {
   const error = e as string
    return { ok: false, e: error }
  }

}


export const removeProduct = async (product:productI, uid:string, id:string):Promise<ResponseI<null>> => {
  try {
    const docRef = doc(APP_DB, "user", uid, 'products', id);
    await deleteDoc(docRef);
    if (product.img) await deleteImgFromStore(uid, id)


    return { ok: true, data: null }
  } catch (e) {
      const error = e as string
    return { ok: false, e: error }
  }

}


export const editProduct = async ( uid:string, id:string, newData:any, file:any):Promise<ResponseI<any>> => {
  
  const docLink = doc(APP_DB, 'user', uid, 'products', id);

  if (file) {
    const url = await addImgToFirebase(file, id, uid);
    newData['img'] = url.data

  }

  try {

    await updateDoc(docLink,newData);
    return { ok: true, data: newData };
  } catch (e) {
       const error = e as string
    return { ok: false, e: error }
  }



}
