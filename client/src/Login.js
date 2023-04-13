import React, {useState, useRef, useEffect, useContext} from "react";
import {Navigate} from 'react-router-dom';
export const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] =useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [backendData, setBackendData] = useState({});
    const [success, setSuccess] =useState(false);


    useEffect(()=>{
        setErrMsg('');
    }, [email, pass]);

    useEffect(()=>{
        fetch("/api").then(
          response => response.json()
        ).then(
          data=> {
            setBackendData(data);
            //console.log(backendData, localStorage.getItem("Success"));
          }
        )
      }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const currentsuccess = localStorage.getItem("Success");
            console.log(currentsuccess);
            for(let i=0; i<backendData.Users.length; i++){
                //console.log(backendData.Users[i].email)
                if(backendData.Users[i].email == email && backendData.Users[i].password==pass){
                   localStorage.setItem("Success", true);
                   localStorage.setItem("Role", backendData.Users[i].role);
                   const currentsuccess = localStorage.getItem("Success");
                   const userRole = localStorage.getItem("Role");
                   //console.log(currentsuccess);
                   //console.log(userRole);
                   setSuccess(currentsuccess);
                   <Navigate to='/dashboard'/>
                   window.location.reload(false);
                }
            }
        }catch (err){
            if(!err?.response){
                setErrMsg('No Server Response');

            }
        }

    }
    return(         
        <>
        {localStorage.getItem("Success")?(
            <section>
            </section>
        ) : (
        
        <section>
        <p ref={errRef} className ={errMsg ?  "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email: </label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">  password: </label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        </section>
        )}
        </>
    );
}