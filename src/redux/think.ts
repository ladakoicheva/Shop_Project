import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ResponseI } from "../../types/types";
import type { AppDispatch, RootState } from "./store";
import { changeUser } from "./auth/auth";
import { closeLoadingApp , openLoadingApp} from "./loading/loading";
import { onAuthStateChanged } from "firebase/auth";
import { APP_AUTH } from "../services/firebase";
import { connectLiveSetting } from "../services/firebase/socket/setting";
import { updateStyles } from "./auth/auth";
import type { settingsI } from "../../types/types";
import { getIsAdmin } from "./auth/auth";


export const connectToApp = createAsyncThunk<
  
  ResponseI<null>,
  void,
  {dispatch : AppDispatch, state : RootState}
>(
  'auth/connectToApp',
  async (_, { dispatch }) => {

     dispatch(openLoadingApp());
    const callBack = (data: settingsI) => {
    const settings: Omit<settingsI,'isAdmin'> = {
    bgbg: data.bgbg,
    name: data.name,
    namecolor: data.namecolor,
    namefontSize: data.namefontSize,
    pricecolor: data.pricecolor,
    pricefontSize: data.pricefontSize,
    currency: data.currency,
    };
      dispatch(updateStyles(settings));
      dispatch(getIsAdmin(data.isAdmin))
 
      }
        
    try {
      // const store: RootState = getState();
     
      // autorisation start
      onAuthStateChanged(APP_AUTH, (user) => {
        console.log('auth changed')
          if (user) {
          const userData = {
          uid: user!.uid,
          email: user!.email!
        }
            dispatch(changeUser(userData))
            connectLiveSetting(callBack, user.uid);
            
            
          } else {
            dispatch(changeUser(null));
        } 
      
        setTimeout(() => {
            dispatch(closeLoadingApp());
          },200)

     
     
        // dispatch(closeLoadingApp());
        // autorisation end
        //setting connect
         
            //! fix update page - логика последовательности поговорить 
 })

      //
    }
    
    catch (err) {
      if(err instanceof Error)  return { ok: false, data: null, message: err.message };
    }

    return { ok: false, data: null, message: 'unknown error' };
    
  })



  