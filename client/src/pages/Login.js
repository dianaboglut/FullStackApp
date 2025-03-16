import React, {useState} from "react";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

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
                setMessage(data.error); // Display error from backend
            } else {
                setMessage("Login successful!");
                console.log("User logged in:", data);
                // Here you could redirect the user or save their session
            }
          }) 
          .catch((error) => console.error("Error fetching posts:", error));
    };

    return(
        <div>
            <input 
                type="text"
                onChange={(event) =>{
                    setUsername(event.target.value);
                }}
            />
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