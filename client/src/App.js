import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";

function App() {
  const [authState, setAuthState] = useState({username: "", id: 0, status: false});

  useEffect(() => {
    fetch("http://localhost:3001/auth/auth", {
      method: "GET", 
      headers: {
        "Content-Type": "application/json", 
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        if (data.error) {
          setAuthState({...authState, status: false}); // If there is an error in response
        } else {
          setAuthState({username: data.username , id: data.id, status: true}); // If no error, user is authenticated
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any fetch error
        setAuthState(false); // Set authState to false on error
      });
  }, []); // Empty dependency array to run effect once on mount

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id: 0, status: false});
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <div className="navbar">
          <Link to="/"> Home Page </Link> 
          <Link to="/createpost"> Create a post </Link>
          {!authState.status ? (
              <>
                <Link to="/login"> Login</Link>
                <Link to="/registration"> Registration</Link>
              </>
            ) : (
              <button onClick={logout}> Logout </button>
            )}

            <h1>{authState.username}</h1>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      </AuthContext.Provider> 
    </div>
  );
}

export default App;
