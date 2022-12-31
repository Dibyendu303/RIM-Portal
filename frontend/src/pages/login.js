import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import background from "../assets/arun-chandran-d3KPuA3ZG1w-unsplash 1 (1).png"





function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      
    };
  
    //onAuthStateChanged(firebaseAuth, (currentUser) => {
      //if (currentUser) navigate("/");
    //});
  
    return (

            <div className='background_image'>
                <img src={background} alt="background" />
                <div classNmae= 'blue_background'>
                    <div className='RIM'>
                        <h1>RIM</h1>
                        
                        <h1>Portal</h1>
                        <div>
                            <div className='form'>
                            <form action=" " onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type = "text" name= "email" id="email" autocomplete ="off" value={email} Onchange={(e) => setEmail(e.target.value)}/>
                                       
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type = "password" name= "password" id="password" autocomplete ="off" value={password} Onchange={(e) => setPassword(e.target.value)}/>

                                </div>
                                <button type="submit">Login</button>
                            </form>

                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>
    );
}





export default Login;