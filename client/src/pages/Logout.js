import React from "react";
import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate=useNavigate();
    
    const logout=()=>{
        // Remove token from sessionStorage
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        // Redirect to login page
        navigate("/login");
    }
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;