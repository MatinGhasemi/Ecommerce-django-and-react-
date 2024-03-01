import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

import csrftoken from "../components/csrftoken";


const EditAddress = () => {
    const [result,setResult] = useState({});
    const [info,setInfo] = useState({
        first_name: "",
        email: "",
        telephone: "",
        city: "",
        post_address: null,
        address: "",
    });

    const redirect = useNavigate();

    const LoginContainer = useRef();
    const FirstName = useRef();
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
        {'first_name':info.first_name,'email':info.email,'telephone':info.telephone,
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
            <Link to={'/accounts/'} className='back-index btn btn-secondary'>Back</Link>
            <img src={require('../images/product world.jpg')} alt="background" className="address-background" />
            <div ref={LoginContainer} style={{display:'block'}} className="address-container">
                <form onSubmit={e=>handleSubmit(e)}>
                    <div>
                        <div className="text-center color-text ">Ecommerce</div>
                        <div>
                            <div className="mx-2">Name</div>
                            <div className="address-input-container">
                                <input ref={FirstName} value={info.first_name} onChange={e => setInfo({...info,first_name:e.target.value})} className="address-input" type="text" placeholder="First Name"/>
                            </div>
                            <div className="mx-2">Email</div>
                            <div className="address-input-container">
                                <input ref={Email} value={info.email} onChange={e => setInfo({...info,email:e.target.value})} className="address-input" type="email" placeholder="Email"/>
                            </div>
                            <div className="mx-2">Telephone</div>
                            <div className="address-input-container">
                                <input ref={Telephone} value={info.telephone} onChange={e => setInfo({...info,telephone:e.target.value})} className="address-input" type="text" placeholder="Telephone"/>
                            </div>
                            <div className="mx-2">City</div>
                            <div className="address-input-container">
                                <input ref={City} value={info.city} onChange={e => setInfo({...info,city:e.target.value})} className="address-input" type="text" placeholder="City"/>
                            </div>
                            <div className="mx-2">Post Address</div>
                            <div className="address-input-container">
                                <input ref={PostAddress} value={info.post_address} onChange={e => setInfo({...info,post_address:e.target.value})} className="address-input" type="text" placeholder="Post Address"/>
                            </div>
                            <div className="mx-2">Address</div>
                            <div className="address-input-container">
                                <textarea ref={Address} value={info.address} onChange={e => setInfo({...info,address:e.target.value})} className="address-textarea" placeholder="Address ..." rows={4}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="edit-submit-container">
                        <div><input type="submit" name="Login" className="address-btn"/></div>
                    </div>
                </form>
            </div>
        </>
     );
}
 
export default EditAddress;