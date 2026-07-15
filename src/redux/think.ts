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


export const connectToApp = createAsyncThunk<
  
  ResponseI<null>,
  void,
  {dispatch : AppDispatch, state : RootState}
>(
  'auth/connectToApp',
  async (_, {dispatch, getState}) => {
   
    try {
      // const store: RootState = getState();
      dispatch(openLoadingApp());
      // autorisation start
       onAuthStateChanged(APP_AUTH, (user) => {
       
        const isUser = !user;
        if (isUser) return dispatch(changeUser(null));
        
        const userData = {
          uid: user.uid,
          email: user.email!
        }
        
        dispatch(changeUser(userData))
        // autorisation end
        //setting connect
          
           const callBack = (data:settingsI) => {
                dispatch(updateStyles(data));
              }
           connectLiveSetting(callBack, user.uid);
                
            
           
          
        
        //
     
        dispatch(closeLoadingApp());
      })

      // 

    }
    catch (err) {
      if(err instanceof Error)  return { ok: false, data: null, message: err.message };
    }
    return { ok: false, data: null, message: 'unknown error'};
  })


