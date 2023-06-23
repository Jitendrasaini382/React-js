import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import edituser from './edit user.png';
function Useredit() {
    const { id } = useParams(); //getting id from url
    const [getdata, setgetdata] = useState({});//store data
    const [error, seterror] = useState({}); //store  form errors when form validating.
    const [flag, setflag] = useState(false);//just temporary  state veriable. 

    const redirect=useNavigate();
   
    //first, fetch the data  from api by id that provided by url.
    useEffect(() => {
        fetch('https://649164fd2f2c7ee6c2c82291.mockapi.io/users/users/' + id)
            .then(response => response.json())
            .then(response => {
                setgetdata(response);//store api data in usestate.
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[]);


    //control when input change
    const handlechange=(e)=>{
        const { name, value } = e.target;
        setgetdata({...getdata,[name]:value});
        // console.table(getdata); 
    }

    //control when form submit
    const handlesubmit=(e)=>{
        e.preventDefault();
        seterror(validateform(getdata));  //validate form
        // console.log(error);
        setflag(true);
    }

    //when form  is validated.
    useEffect(() => {
         console.log(error);
        if (Object.keys(error).length === 0 && flag) {
            fetch('https://649164fd2f2c7ee6c2c82291.mockapi.io/users/users/'+id,
            {
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                },body : JSON.stringify(getdata)
            }
            ).then(Response => Response.json()).then(res =>{

                alert("User Edited");
                redirect("/");
                
            })

        }
    }, [error])


    //Function for validating form
    const validateform = (value) => {
        const errors = {};
        const name_regex=/^[a-zA-Z ]{2,30}$/;
        const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!value.Name) {
            errors.Name = "Name is required.";
        }
        else if(!name_regex.test(value.Name)){
            errors.Name = "Name is invalid.";

        }
        if (!value.Email) {
            errors.Email = "Email is required.";
        }
        else if (!email_regex.test(value.Email)) {
            errors.Email = "Email is invalid.";

        }

        if (!value.phone) {
            errors.phone = "phone number is required .";
        }
        else if (value.phone.length !== 10) {
            errors.phone = "phone number is invalid.";

        }
        return errors;
    }


    
    return <>
        <div className='container'>
            <div className='row mt-3'>
                <div className='col-12'>
                    <h1 className='text-center'>Useredit</h1>
                    <hr></hr>

                </div>
            </div>
            <div className='row mt-4'>
                <div className='col-md-6 p-md-5'>
                    <form onSubmit={handlesubmit}>
                        <div className='mt-5'>
                            <label className='form-label'>Name :</label>
                            <input type='text' name='Name' value={getdata.Name} onChange={handlechange} className='form-control'></input>
                            <p className='text-danger'>{error.Name}</p>
                        </div>

                        <div className='mt-5'>
                            <label className='form-label'>Email :</label>
                            <input type='text' name='Email' value={getdata.Email} onChange={handlechange} className='form-control'></input>
                            <p className='text-danger'>{error.Email}</p>
                        </div>

                        <div className='mt-5'>
                            <label className='form-label'>Phone :</label>
                            <input type='text' name='phone' value={getdata.phone} onChange={handlechange} className='form-control'></input>
                            <p className='text-danger'>{error.phone}</p>
                        </div>
                       <div className='mt-5'>
                       <button className='btn btn-outline-success d-block w-100'>Edit</button>
                       </div>
                    </form>
                </div>
                <div className='col-md-6 p-md-5'>
                    <img src={edituser} className='w-100' alt='img'></img>

                </div>
            </div>
        </div>
    </>

}

export default Useredit;