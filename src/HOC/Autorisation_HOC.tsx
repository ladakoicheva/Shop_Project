import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/type";



export const Autorisation_HOC = (Component:React.ComponentType<any>) => (props:any) => {

  const { isLoadingApp} = useAppSelector((s)=>s.loading)
  const isLogin = useAppSelector((s)=>!!s.auth.user)
 

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