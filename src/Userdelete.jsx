import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { Navigate, useNavigate, useParams} from 'react-router-dom';


const Userdelete = () => {
    const [data, setData] = useState([]);
    const[load,setload]=useState(true);
    const{id}=useParams();
    const redirect =useNavigate();
    useEffect(() => {
        async function fetchdata(){
            const response=   await fetch('https://649164fd2f2c7ee6c2c82291.mockapi.io/users/users/'+id,
            {
                method:'Delete',
                headers:{
                    'Content-Type': 'application/json',
                }
            });
            const data=await response.json();
            setData(data);
            setload(false);

        }
      fetchdata();
    }, [])


    function gohome(){
        alert("user deleted");
        redirect("/");
    }
    
    if(load){
        return <>
        <h2 className='loading'>Please Wait...</h2>
        </>
    }
    
   else{
    return gohome();
   }
}
    
      


    
    


export default Userdelete