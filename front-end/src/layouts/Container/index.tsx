import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import { SIGN_IN_PATH } from "../../constants";

export default function Container() {

  const location = useLocation();

  if(location.pathname === SIGN_IN_PATH()) return (<><Outlet /></>)

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}