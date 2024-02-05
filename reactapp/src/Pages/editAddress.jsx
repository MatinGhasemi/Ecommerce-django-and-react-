import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

import csrftoken from "../components/csrftoken";


const EditAddress = () => {
    const [result,setResult] = useState({});
    const [info,setInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        telephone: "",
        city: "",
        post_address: null,
        address: "",
    });

    const redirect = useNavigate();

    const LoginContainer = useRef();
    const FirstName = useRef();
    const LastName = useRef();
    const Email = useRef();
    const Telephone = useRef();
    const City = useRef();
    const PostAddress = useRef();
    const Address = useRef();


    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/edit/useraddress/');
            setInfo(response.data)
        };
        fetchData();
    },[])


    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await axios.put('http://127.0.0.1:8000/api/ecommerce/edit/useraddress/',
        {'first_name':info.first_name,'last_name':info.last_name,'email':info.email,'telephone':info.telephone,
        'city':info.city,'post_address':info.post_address,'address':info.address},{headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        }})
        setResult(response.data)
        if (response.data.success){
            return redirect('/accounts/')
        }
    }

    const errorAlert = ()=>{
        if (result.error){
            return(
            <>
                <div className="mx-5 my-2 alert alert-danger">
                  <strong>{result.error}</strong>
                </div>
            </>
            )
        }
    }


    return ( 
        <>  
            {errorAlert()}
            <Link to={'/accounts/'} className='btn btn-secondary'>Back</Link>
            <div ref={LoginContainer} style={{display:'block'}} className="login-container">
                <form onSubmit={e=>handleSubmit(e)}>
                    <div className="login-input-container">
                        <div>
                            <div className="my-3">First Name</div>
                            <div className="my-4">Last Name</div>
                            <div className="my-4">Email</div>
                            <div className="my-4">Telephone</div>
                            <div className="my-4">City</div>
                            <div className="my-4">Post Address</div>
                            <div className="my-4">Address</div>
                        </div>
                        <div>
                            <input ref={FirstName} value={info.first_name} onChange={e => setInfo({...info,first_name:e.target.value})} className="login-input my-1" type="text" placeholder="First Name"/>
                            <input ref={LastName} value={info.last_name} onChange={e => setInfo({...info,last_name:e.target.value})} className="login-input my-1" type="text" placeholder="Last Name"/>
                            <input ref={Email} value={info.email} onChange={e => setInfo({...info,email:e.target.value})} className="login-input my-1" type="email" placeholder="Email"/>
                            <input ref={Telephone} value={info.telephone} onChange={e => setInfo({...info,telephone:e.target.value})} className="login-input my-1" type="text" placeholder="Telephone"/>
                            <input ref={City} value={info.city} onChange={e => setInfo({...info,city:e.target.value})} className="login-input my-1" type="text" placeholder="City"/>
                            <input ref={PostAddress} value={info.post_address} onChange={e => setInfo({...info,post_address:e.target.value})} className="login-input my-1" type="text" placeholder="Post Address"/>
                            <textarea ref={Address} value={info.address} onChange={e => setInfo({...info,address:e.target.value})} className="register-textarea my-1" placeholder="Address ..." rows={4}></textarea>
                        </div>
                    </div>
                    <div className="edit-submit-container">
                        <div><input type="submit" name="Login" className="btn btn-danger"/></div>
                    </div>
                </form>
            </div>
        </>
     );
}
 
export default EditAddress;