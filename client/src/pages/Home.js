import React from "react";
import { useEffect, useState } from "react";

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
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
                <div key={key} className="post">
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