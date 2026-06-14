
import { doc, getDocs, getDoc, setDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { APP_DB, APP_STORAGE } from "../index";


export const addProduct = async (product, file, uid) => {
  try {
    const id = uuidv4()

    const responsrFile = await addImgToFirebase(file, id, uid)
    if (!responsrFile.ok) return { ok: false, data: 'Error load' }

    const docLink = doc(APP_DB, 'user', uid, 'products', id)
    const data = { ...product, id, img: responsrFile.data }
    await setDoc(docLink, data)
    return { ok: true, data: data }


  } catch (e) {
    console.log(e)
    return { ok: false, data: null }
  }

}



export const addImgToFirebase = async (file, id, uid) => {
  if (file) {
    try {
      const link = ref(APP_STORAGE, `${uid}/${id}`);
      const snapShot = await uploadBytes(link, file)
      const url = await getDownloadURL(snapShot.ref)
      return { ok: true, data: url }
    } catch (error) {
      return { ok: false, data: null }
    }
  } else {
    return { ok: true, data: null };
  }


}

export const deleteImgFromStore = async (uid, id) => {
  try {
    const link = ref(APP_STORAGE, `${uid}/${id}`);
    await deleteObject(link)
    return { ok: true, text: 'deleted' };
  } catch (e) {
    return { ok: false, text: e }
  }


}





export const getAllProducts = async (uid) => {
  try {
    const colRef = collection(APP_DB, "user", uid, 'products');
    const docSnap = await getDocs(colRef);
    const productsList = docSnap.docs.map(doc => ({
      ...doc.data()
    }));

    console.log(docSnap)



    return { ok: true, data: productsList }
  } catch (e) {
    return { ok: false, error: e }
  }
}


export const getOneProduct = async (uid, id) => {
  const docLink = doc(APP_DB, 'user', uid, 'products', id);
  try {
    const colRef = doc(APP_DB, "user", uid, 'products', id);
    const docSnap = await getDoc(colRef);

    return { ok: true, data: docSnap.data() }
  } catch (e) {
    return { ok: false, error: e }
  }

}


export const removeProduct = async (product, uid, id) => {
  try {
    const docRef = doc(APP_DB, "user", uid, 'products', id);
    await deleteDoc(docRef);
    console.log(product)
    if (product.img) await deleteImgFromStore(uid, id)


    return { ok: true, text: 'deleted successfully' }
  } catch (e) {
    return { ok: false, error: e }
  }

}


export const editProduct = async ( uid, id, newData, file) => {
  
  const docLink = doc(APP_DB, 'user', uid, 'products', id);

  if (file) {
    const url = await addImgToFirebase(file, id, uid);
    newData['img'] = url.data

  }

  try {

    const res = await updateDoc(docLink,newData);
    return { ok: true, data: newData };
  } catch (e) {
    return { ok: false, error: e }
  }



}
