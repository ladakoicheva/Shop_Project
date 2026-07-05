import { Navigate } from "react-router-dom";



export const Autorisation_HOC = (Component) => (props) => {

  const { isLoadingApp, isLogin} = props.auth
 
 

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