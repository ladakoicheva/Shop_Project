import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/features/useAuth";
import noFound from "../Pages/404Page/NoFound";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";



export const Autorisation_HOC = (Component) => (props) => {

  const navigate = useNavigate()
  const auth = useAuthContext()
  const isLogin = auth.isLogin;


  useEffect(() => {
    auth.openLoading();
    if (!auth.isLoadingApp) auth.closeLoading()
  }, [auth.isLoadingApp])
  if (auth.isLoadingApp) return <></>


  if (isLogin) {
    return <Component {...props} />
  }
  return <Navigate to="/*" />



}