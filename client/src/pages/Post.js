import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";


function Post(){
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]); // a list
    const [newComment, setNewComment] = useState("");
    const {authState} = useContext(AuthContext);
    
    useEffect(() => {
        if (!id) return; // Prevents fetching if id is undefined
    
        fetch(`http://localhost:3001/posts/byId/${id}`)
            .then((response) => response.json())
            .then((data) => setPostObject(data))
            .catch((error) => console.error("Error fetching post:", error));
    
        fetch(`http://localhost:3001/comments/${id}`)
            .then((response) => response.json())
            .then((data) => setComments(data))
            .catch((error) => console.error("Error fetching comments:", error));
    }, [id]);
    
    const addComment=()=>{
        fetch("http://localhost:3001/comments",{
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                accessToken: localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                commentBlock: newComment,
                PostId: id,
            }),
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.error){
                console.log(data.error);
            }else{
                const commentToAdd = {commentBlock: newComment, username: data.username};
                setComments([...comments,commentToAdd]); // Update state with new comment, "...comments" - previous comments 
                setNewComment(""); // Clear input field
            }
          }) 
          .catch((error) => console.error("Error fetching posts:", error));
    };

    const deleteComment=(id)=>{
        fetch(`http://localhost:3001/comments/${id}`,{
            method: "DELETE",
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
          .then(() => {
            setComments(
                comments.filter((val) => {
                    return val.id !== id;
                })
            );
          })
          .catch((error) => console.error("Error fetching posts:", error));
    };

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
                <div className="addCommentContainer">
                    <input type="text" 
                        placeholder="Comment ..." 
                        autoComplete="off" 
                        onChange={(event)=>{setNewComment(event.target.value)}} 
                        value={newComment}>
                    </input>
                    <button onClick={addComment}> Add Comment</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment,key) =>{
                        return (
                            <div key={key} className="comment"> 
                                {comment.commentBlock}
                                <label> Username: {comment.username} </label>
                                {authState.username === comment.username && 
                                    <button onClick={() => {deleteComment(comment.id)}}>Delete</button>
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;