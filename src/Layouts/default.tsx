import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export default function DefaultLayout() {
  return (
    <>
      <NavBar showNavLinks={true} />
      <Outlet />
    </>
  );
}
