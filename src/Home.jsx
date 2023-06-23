import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';




const Home = () => {
    const [data, setData] = useState([]); //Store data 
    const[load,setload]=useState(true);   //show a loading text when api loads.

    //Fetching data from api.
    useEffect(() => {
        async function fetchdata(){
            const response=   await fetch('https://649164fd2f2c7ee6c2c82291.mockapi.io/users/users');
            const data=await response.json();
            setData(data);   //Storing api data 
            setload(false);
            // console.log(data.length);

        }
      fetchdata();
    }, [])
    if(load){
        return <>
        <h2 className='loading'>Loading...</h2>
        </>
    }
    // console.log(data);





    return <>
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-md-6 '>
                    <h2>Users List</h2>
                </div>
                <div className='col-md-6 justify-content-end d-flex align-item-center'>
                    <Link to="/addnewuser" className='btn btn-outline-success btn-lg float-right'>Add New User</Link>
                </div>
            </div>
            <div>
      {data.length === 0 ? (
        <h2 className='loading'>No data available.</h2>
      ) : (
       
        <div className='row mt-5'>
        <div className="col-12">
            <div className='table-responsive'>
                <table className='table table-hover'>
                    
                    
                    <thead>
                        <tr>
                            <td className='text-center'>Sr. No.</td>
                            <td className='text-center'>Name</td>
                            <td className='text-center'>Email</td>
                            <td className='text-center'>Phone</td>
                            <td className='text-center'> Edit</td>
                            <td className='text-center'> Delete</td>
                        </tr>
                    </thead>
                    <tbody>


                        {
                          

                            data.map((user, id) => {   //Showing data in table
                                if(user.leangth<1){
                                    return <> <p>dfffdf</p></>
                                }
                                else{
                                return <>
                                    <tr key={useEffect.id} >
                                        <td className='text-center'>{id + 1}</td>
                                        <td className='text-center'>{user.Name}</td>
                                        <td className='text-center'>{user.Email}</td>
                                        <td className='text-center'>{user.phone}</td>
                                        <td className='text-center'> <Link to={`/useredit/${user.id}`}><i className="fa-solid edit fa-user-pen fa-25"></i></Link> </td>
                                        <td className='text-center'> <Link to={`/userdelete/${user.id}`}><i className="fa-solid delete fa-trash fa-25"></i></Link> </td>
                                    </tr></>}
                            })
                        }
                        <tr></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

      )}
    </div>
  
           
        </div>
    </>
}

export default Home