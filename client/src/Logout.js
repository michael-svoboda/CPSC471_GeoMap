import React from "react";
import {Navigate} from 'react-router-dom';

export const Logout  = () => {
    function clearglobals(){
    console.log("we in this bitch");
    localStorage.clear();
    <Navigate to='/Login'/>
    };
    return (<form onSubmit={Logout}>
        <button onClick={clearglobals}>Logout</button> 
        </form>)
}