import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

function Post(){
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});

    useEffect(()=>{
        fetch(`http://localhost:3001/posts/byId/${id}`) // Fetching data from API
          .then((response) => response.json()) // Convert response to JSON
          .then((data) => setPostObject(data)) // Update state with fetched data
          .catch((error) => console.error("Error fetching posts:", error)); // Handle errors
    }, [id]); // Add `id` as a dependency to re-fetch when `id` changes

    return(
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title">{postObject.title}</div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">
                Comment Section
            </div>
        </div>
    );
}

export default Post;