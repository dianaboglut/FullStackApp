import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
                sessionStorage.setItem("accessToken", data);
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
                onChange={(event) =>{
                    setUsername(event.target.value);
                }}
            />
            <label>Password:</label>
            <input type="password"
                onChange={(event)=>{
                    setPassword(event.target.value);
                }}
            />

            <button onClick={login}> Login </button>
        </div>
    )
}

export default Login;