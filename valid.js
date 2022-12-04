import React from "react";
import {Formik, useFormik} from "formik";
import * as yup from "yup";
import './sample.scss';
import axios from "axios";

export function Valid()
{
    const formik = useFormik({
        initialValues:{
            name:'',
            email:''

        },validationSchema:yup.object({
            name: yup.string()
                .required("Name is compulsory")
                .strict()
                .trim()
                .min(3,"minimum 3 characters required")
                .max(20,"maximum 20 characters only"),
            email:yup.string()
            .email()

        }),
        onSubmit: (userInputData)=>{
            document.write(userInputData);
        }

    })

    //passer
    const handlesubmit = (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);

        const config = {     
            headers: { 'enctype': 'multipart/form-data' }
        }

        axios.post('http://localhost:3100/signvalid',datastring,config)
        .then(function(res){
            if(res.data.status ==='Created'){
                alert('Created');
                window.location.reload();
            }
            else{
                alert('Error');
                window.location.reload();
            }
        })
        .catch(function(err){
            alert(err);
            window.location.reload();
            localStorage.setItem('id',id);
            window.location.href="./dashboard";
        });
        
    }
    
    return(
        <div className="wrapp">
            <form onSubmit={handlesubmit}>
            <h1>Form Validation</h1>
            <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name}/>
            {formik.errors.name?
                <div className="text-danger">{formik.errors.name}</div>:null
            }

            <input type="text" name="email" onChange={formik.handleChange} value={formik.values.email}/>
            {formik.errors.email?
            <div className="text-danger">{formik.errors.email}</div>:null }



            <button type="submit" value="submit">Submit</button>
            
            </form>
        </div>
    );
}