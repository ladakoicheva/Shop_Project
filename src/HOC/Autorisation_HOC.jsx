import { Navigate } from "react-router-dom";



export const Autorisation_HOC = (Component) => (props) => {

  const { isLoadingApp, isLogin } = props.auth
 
  const Children = Component;

  // useEffect(() => {
  //  openLoading();
  //   if (!isLoadingApp) closeLoading()
  // }, [isLoadingApp,closeLoading,openLoading])
  if (isLoadingApp) return <></>


  if (isLogin) {
    return <Children {...props} />
  }
  return <Navigate to="/*" />



}