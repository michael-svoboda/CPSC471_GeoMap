import React, {useState, useRef, useEffect, useContext} from "react";

export const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] =useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [backendData, setBackendData] = useState({});
    const [success, setSuccess] = useState(false);
    const click = () => {
        alert(email);
    }

    async function FetchLoginInf(){
        await fetch("./api").then(
            response => response.json()
        ).then(
            data=>{
                setBackendData(data);
            }
        )
    }


    useEffect(()=>{
        setErrMsg('');
    }, [email, pass]);

    /*
    useEffect(()=>{
        fetch("/api").then(
          response => response.json()
        ).then(
          data=> {
            setBackendData(data);
            console.log(backendData);
          }
        )
      }, []); */


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            do{
            fetch("./api").then(
                response => response.json()
            ).then(
                data=>{
                    setBackendData(data);
                    console.log(backendData);
                }
            ) }
            while(backendData.Users=={});
            for(let i=0; i<backendData.Users.length; i++){
                console.log(backendData.Users[i].email);
                if(backendData.Users[i].email == email && backendData.Users[i].password==pass){
                    setSuccess(true);
                }
            }
            if(success==false){
                setErrMsg('Wrong Username or Password');
            }
        }catch (err){
            if(!err?.response){
                setErrMsg('No Server Response');
            }
        }

    }
    return(
        <>
        {success ?(
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : (
        
        <section>
        <p ref={errRef} className ={errMsg ?  "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>;
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        </section>
        )}
        </>
    );
}