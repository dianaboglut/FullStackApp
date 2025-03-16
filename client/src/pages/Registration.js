import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik"; // to create form
import * as Yup from "yup"; // import all from yup

function Registration(){
    const initialValues={
        username: "",
        password: "",
    };
    
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(), 
        password: Yup.string().min(4).max(20).required(),
    });
        
    const onSubmit=(data)=>{
        fetch("http://localhost:3001/auth",{
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          }) 
          .catch((error) => console.error("Error fetching posts:", error));
    };

    return(
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span"/>
                    <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="(Ex. Anna...)"/>
                        
                    <label>Password: </label>
                    <ErrorMessage name="password" component="span"/>
                    <Field autocomplete="off" type="password" id="inputCreatePost" name="password" placeholder="Password..."/>
                    
                    <button type="submit"> Register </button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration;