import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik"; // to create form
import * as Yup from "yup"; // import all from yup
import { useNavigate } from "react-router-dom";


function CreatePost(){
    const initialValues={
        title: "",
        postText: "",
        username: "",
    };

    const validationSchema = Yup.object().shape({
        title:Yup.string().required("You must input a Title!"), 
        postText:Yup.string().required(),
        username: Yup.string().min(3).max(15).required(), 
    });
    
    let navigate=useNavigate();

    const onSubmit=(data)=>{
        fetch("http://localhost:3001/posts",{
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate("/"); 
          }) 
          .catch((error) => console.error("Error fetching posts:", error));
    };


    return (
    <div className="CreatePostPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <label>Title: </label>
                <ErrorMessage name="title" component="span"/>
                <Field autocomplete="off" id="inputCreatePost" name="title" placeholder="(Ex. Title...)"/>

                <label>Post: </label>
                <ErrorMessage name="postText" component="span"/>
                <Field autocomplete="off" id="inputCreatePost" name="postText" placeholder="(Ex. Post...)"/>

                <label>Username: </label>
                <ErrorMessage name="username" component="span"/>
                <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="(Ex. Anna...)"/>
                
                <button type="submit"> Create Post </button>
            </Form>
        </Formik>
    </div>
    );
}

export default CreatePost;
