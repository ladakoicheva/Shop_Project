import { doc,collection, onSnapshot } from "firebase/firestore";
import { APP_DB } from "../index";
import type { messageDataI } from "../../../Pages/AdminPage/type";
import type { messageDataUserI } from "../../../Pages/AdminPage/type";


export const connectLiveChatAdmin = (callBack: (data: messageDataI) => void) => {
  const link = collection(APP_DB, 'messages');
  const unsubscribe = onSnapshot(link, (snapshot) => {
    const result: messageDataI = {};
    snapshot.docs.forEach((doc) => {
      result[doc.id] = doc.data() as messageDataUserI;
    });
    callBack(result);
  });
  return unsubscribe;
};

export const connectLiveChatClient = (
  callBack: (data: messageDataUserI) => void,
  email: string
) => {
  const link = doc(APP_DB, 'messages', email);
  const unsubscribe = onSnapshot(link, (docSnap) => {
    if (docSnap.exists()) {
      callBack({ ...docSnap.data() } as messageDataUserI);
    } else {
      callBack({});
    }
  });
  return unsubscribe;
};
