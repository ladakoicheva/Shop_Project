import { collection, onSnapshot } from "firebase/firestore";
import { APP_DB } from "..";
import type { productI } from "../../../../types/types";

export const connectToAllProducts = (uid:string, callback:(type:string,data:productI)=>void) => {
  const link = collection(APP_DB, 'user', uid, "products");

  const unsubscribe = onSnapshot(link, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = {
        ...change.doc.data(),


      } as productI;
     
      callback(change.type, data)
    });
    //!
  });
  return unsubscribe
}

// {
//   "type": "added",        // Тип изменения: "added", "modified" или "removed"
//     "oldIndex": -1,         // Индекс документа до изменения (-1, если документа не было)
//       "newIndex": 0,          // Индекс документа после изменения
//         "doc": {                // Объект самого документа (QueryDocumentSnapshot)
//     "id": "product_123",  // ID документа в Firestore
//       "_document": { ... }, // Внутренняя служебная информация Firebase
//     // Метод для получения данных
//     "data": () => ({
//       "name": "Salmon Sushi",
//       "price": 250
//     })
//   }
// }