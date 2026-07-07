import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



export const Autorisation_HOC = (Component) => (props) => {

  const { isLoadingApp} = useSelector((s)=>s.loading)
  const isLogin = useSelector((s)=>!!s.auth.user)
 

 if (isLogin) {
   return <Component {...props} />
  }
  // useEffect(() => {
  //  openLoading();
  //   if (!isLoadingApp) closeLoading()
  // }, [isLoadingApp,closeLoading,openLoading])
  if (isLoadingApp)  return <></>


 
  return <Navigate to="/*" />



}