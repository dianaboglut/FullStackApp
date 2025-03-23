import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {setAuthState} = useContext(AuthContext);

    const login =()=>{
        const data ={username:username, password:password};

        fetch("http://localhost:3001/auth/login",{
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                localStorage.setItem("accessToken", data);
                setAuthState(true);
                navigate("/"); // Use navigate() after login to go to homepage
            }
          }) 
          .catch((error) => console.error("Error fetching posts:", error));
    };

    return(
        <div className="loginContainer">
            <label>Username:</label>
            <input 
                type="text"
                placeholder="Enter your username"
                onChange={(event) =>{
                    setUsername(event.target.value);
                }}
            />
            <label>Password:</label>
            <input type="password"
                placeholder="Enter your password"
                onChange={(event)=>{
                    setPassword(event.target.value);
                }}
            />

            <button onClick={login}> Login </button>

            <p> Don't have an account? <br/> 
                <span 
                    style={{color:"blue", cursor:"pointer"}}
                    onClick={()=>navigate("/registration")}
                > 
                    Register here
                </span>
            </p>

        </div>
    );
}

export default Login;