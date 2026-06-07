import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../store/store";
import noFound from "../Pages/404Page/NoFound";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";


export const Autorisation_HOC = (Component) => (props) => {

  const navigate = useNavigate()
  const store = useStoreContext();
  const isLogin = store.isLogin;

  useEffect(() => {
    store.openLoading();
    if(!store.isLoadingApp) store.closeLoading()
  },[isLogin])
  if (store.isLoadingApp) return <></>


  if (isLogin ) {
    return <Component {...props} />
  }
  return <Navigate to="/*" />



}