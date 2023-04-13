import { ColorModeContext, useMode} from "./theme";
import {Login} from "./Login";
import {useState, useEffect} from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route, Navigate} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Map from "./scenes/map";
import Production from "./scenes/production";
import Geology from "./scenes/geology";
import LogCharts from "./scenes/wireline";

import { Logout } from "./Logout";

import './App.css';
import ProtectedRoutes from "./ProtectedRoutes";
/* 
import Bar from ".scenes/bar";

import Line from ".scenes/line";
import Pie from ".scenes/pie";
import FAQ from ".scenes/faq";
import Geography from ".scenes/geography";
import Calendar from ".scenes/calendar"; */

function App() {
  const [theme, colorMode] = useMode();
  const [role, setRole ] = useState('')
    useEffect(() => {
        const currentRole = localStorage.getItem("Role");
        if (currentRole!='') {
          setRole(currentRole);
        }
    } , []);

  return (
  <ColorModeContext.Provider value = { colorMode }>
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <div className="app" >
        <Logout/>
        <Sidebar/>
        <main className = "content"  >
          <Topbar />
          <Routes>
            <Route exact path= '/' element={<Navigate replace to = {"/Login"}/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route element = {<ProtectedRoutes/>}>
            <Route path = "/map" element = { <Map /> } />
            <Route path = "/dashboard" element = { <Dashboard /> } />
            <Route path = "/production" element = {((role=="production")||(role=="manager"))? <Production />: <Navigate replace to={"/map"}/>} />
            <Route path = "/geology" element = {((role=="geologist")||(role=="manager"))? <Geology />: <Navigate replace to={"/map"}/>} />
            <Route path = "/wireline" element = {((role=="geologist")||(role=="manager"))? <LogCharts />: <Navigate replace to={"/map"}/>} />
            <Route path = "/contacts" element = { <Contacts /> } />
            <Route path = "/invoices" element = { <Invoices /> } />
            <Route path = "/form" element = { <Form /> } />
            </Route>

            {
            /* 
            <Route path = "/bar" element = { <Bar /> } />
            <Route path = "/pie" element = { <Pie /> } />
            <Route path = "/line" element = { <Line /> } />
            <Route path = "/faq" element = { <FAQ /> } />
            <Route path = "/geography" element = { <Geography /> } />
            <Route path = "/calendar" element = { <Calendar /> } /> */}

          </Routes>
        </main>
        </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default App;
