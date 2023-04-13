import {Outlet} from 'react-router-dom';
import { Login } from './Login';
import { useEffect, useState } from "react";
const ProtectedRoutes = () => {
   const [authenticated, setauthenticated] = useState(false);
     useEffect(() => {
        const loggedInUser = localStorage.getItem("Success");
        if (loggedInUser) {
          setauthenticated(loggedInUser);
        }
      }, [localStorage.getItem("Success")]);
   return authenticated? <Outlet/> : <Login />;
}

export default ProtectedRoutes;