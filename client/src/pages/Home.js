import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate(); // when you are in a route and want to change to another route, we just have to call history.push(pass the route you want to go to)
    useEffect(() => {
        fetch("http://localhost:3001/posts") // Fetching data from API
          .then((response) => response.json()) // Convert response to JSON
          .then((data) => setListOfPosts(data)) // Update state with fetched data
          .catch((error) => console.error("Error fetching posts:", error)); // Handle errors
      }, []);

    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                <div className="post" onClick={()=>{
                    navigate(`/post/${value.id}`);
                    }}>
                    <div className="title">{value.title}</div>
                    <div className="body">{value.postText}</div>
                    <div className="footer">{value.username}</div>
                </div>
                );
      })}
        </div>
    );
}

export default Home;