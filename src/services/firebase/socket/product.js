import { collection, onSnapshot } from "firebase/firestore";
import { APP_DB } from "..";

export const connectToAllProducts = (uid, callback) => {
  const link = collection(APP_DB, 'user', uid, "products");

  const unsubscribe = onSnapshot(link, (snapshot) => {
    console.log(snapshot)
    snapshot.docChanges().forEach((change) => {
     
      const data = {
        id: change.doc.id,
        ...change.doc.data(),


      };
      console.log(data)
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