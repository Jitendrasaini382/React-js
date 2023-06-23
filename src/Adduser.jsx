import React from 'react';
import adduserimg from './Add User.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';



const Adduser = () => {
    const formdata = {
        Name: "",
        Email: "",
        phone: ""
    };
    const [formvalue, setformvalue] = useState(formdata); //Store data
    const [error, seterror] = useState({});   //Store errors when form validating.
    const [flag, setflag] = useState(false);  //Just temporary state veriable.
    const[send,setsending]=useState("");      //Loading data from api.
    const redirect=useNavigate();             //Using navigate for go to home page when form submitted without errors.


    //when input feilds change.
    const changehandle = (e) => {
        const { name, value } = e.target;
        setformvalue({ ...formvalue, [name]: value });
        // console.log(formvalue);
    }

    //when form submit.
    const formsubmit = (e) => {
        e.preventDefault();
        // console.log(formvalue.Name);
        seterror(validateform(formvalue));//validating form
        setflag(true);
    }

    //sending data to api when form subimitted.
    useEffect(() => {
        // console.log(error);
        if (Object.keys(error).length === 0 && flag) {
            setsending("Sending Data...");
            fetch('https://649164fd2f2c7ee6c2c82291.mockapi.io/users/users',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },body : JSON.stringify(formvalue)
            }
            ).then(Response => Response.json()).then(res =>{
                setsending("");
                alert("New user Added");
                redirect('/');
            }).catch(console.log(error));
            

            // console.log(JSON.stringify(formvalue));
            
        }
    }, [error])

    //validation
    const validateform = (value) => {
        const errors = {};


        const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const name_regex=/^[a-zA-Z ]{2,30}$/;
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

        if (value.phone == "") {
            errors.phone = "phone number is required .";
        }
        else if (value.phone.length != 10) {
            errors.phone = "phone number is invalid.";

        }
        return errors;

    }



    return <>
        <div className='container'>
            <div className='row'>
                <div className='col-12 mt-5'>
                    <h2 className='text-center'> Add New User </h2>

                </div>

            </div>
            <div className='row mt-5 '>
                <div className='col-md-6'>
                    <img src={adduserimg} className='w-100' alt="user add image" />

                </div>
                <div className='col-md-6 '>
                    <form onSubmit={formsubmit}>
                        <div className='mt-4'>
                            <label className='form-label' >Name :</label>
                            <input type='text' name='Name' value={formvalue.Name} onChange={changehandle} className='form-control' ></input>
                            <p className='text-danger text-end'>{error.Name}</p>
                        </div>
                        <div className='mt-4'>
                            <label className='form-label' >Email :</label>
                            <input type='text' name='Email' value={formvalue.Email} onChange={changehandle} className='form-control' ></input>
                            <p className='text-danger text-end'>{error.Email}</p>
                        </div>
                        <div className='mt-4'>
                            <label className='form-label' >Phone No. :</label>
                            <input type='number' name='phone' value={formvalue.phone} onChange={changehandle} className='form-control' ></input>
                            <p className='text-danger text-end'>{error.phone}</p>
                        </div>
                        <div className='mt-4'>

                            <button className='btn btn-lg d-block w-100 btn-outline-success'>Add</button>
                            <h4 className='text-green'>{send}</h4>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </>


}

export default Adduser