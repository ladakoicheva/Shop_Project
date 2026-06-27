import { useCallback, useContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { APP_AUTH } from "../../services/firebase";
import { TYPE_MODAL } from "../../Components/Forms/typeModeHelper";
import { createContext } from "react";
import { getSettings } from "../../services/firebase/db/settings";

import { onLoginApi, onRegistartionApi } from "../../services/firebase/auth";


export const AuthContext = createContext({

});


export default function useAuth() {


  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(TYPE_MODAL.SING_UP);
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const isLogin = !!user;
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    bgbg: "rgba(255,255,255)",
    name: "shop",
    namecolor: "rgba(255,242,242)",
    namefontSize: "30",
    pricecolor: "black",
    pricefontSize: "24"
  })




  useEffect(() => {


    onAuthStateChanged(APP_AUTH, (user) => {

      const getUserSetting = async () => {
        const response = await getSettings(user.uid);
        if (response.ok) setSettings(prev => ({ ...prev, ...response.data }))
      }
      if (user) {
        setUser(user)
        getUserSetting()

      } else {
        setUser(null)
      }
      setIsLoadingApp(false)
    })
  }, [])



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


  const changeAuthMode = (value) => {
    setAuthMode(value)
  }

  const updateStyles = (newSettingsObject) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettingsObject
    }));
  };


  const openLoading = useCallback(() => {
    setLoading(true);
  },[setLoading])
  const closeLoading = useCallback(() => {
    setLoading(false);
  },[setLoading])

  return {

    user,
    authMode,
    isLoadingApp,
    isLogin,
    loading,
    settings,
    onLogin,
    logOut,
    onRegistration,
    changeAuthMode,
    updateStyles,
    openLoading,
    closeLoading,

  }



}

export const useAuthContext = () => useContext(AuthContext);
