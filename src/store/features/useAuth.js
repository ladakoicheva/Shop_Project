import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { APP_AUTH } from "../../services/firebase";
import { onRegistartionApi, onLoginApi } from "../../services/firebase/auth";
import { TYPE_MODAL } from "../../Components/Forms/typeModeHelper";
import { useStoreContext } from "../store";


export default function useAuth() {

  const { user, setUser, isLogin,  isLoadingApp, setIsLoadingApp, authMode, setAuthMode } = useStoreContext()

  const onLogin = async (email, password) => {
    const userData = await onLoginApi(email, password);
    if (userData.ok) {
      setUser(userData.data);
    }
    return { ok: userData.ok, message: userData.message, code: userData.code }

  }

  const logOut = async () => {
    try {
      const res = await signOut(APP_AUTH)
      if (res) console.log('sign out successfull');
    } catch (err) {
      console.log(err);
    }


  }


  const onRegistration = async (email, password) => {

    const userData = await onRegistartionApi(email, password);

    if (userData.ok) {
      setUser(userData.data)
    }
    return { ok: userData.ok, message: userData.message, code: userData.code }
  }

  

    return {

  
      isLogin,
      onRegistration,
      onLogin,
      logOut,
      user,
      setUser,
      isLoadingApp,
      setIsLoadingApp,
      authMode,
      setAuthMode


    }


  }

