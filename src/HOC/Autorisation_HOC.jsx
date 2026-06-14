import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../store/store";
import useAuth from "../store/features/useAuth";
import noFound from "../Pages/404Page/NoFound";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";



export const Autorisation_HOC = (Component) => (props) => {

  const navigate = useNavigate()
  const store = useStoreContext();
  const auth = useAuth()
  const isLogin = auth.isLogin;


  useEffect(() => {
    store.openLoading();
    if(!auth.isLoadingApp) store.closeLoading()
  },[store.isLoadingApp])
  if (auth.isLoadingApp) return <></>


  if (isLogin ) {
    return <Component {...props} />
  }
  return <Navigate to="/*" />



}