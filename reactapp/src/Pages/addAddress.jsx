import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import csrftoken from "../components/csrfToken";


const AddAddress = () => {
    const city = useRef();
    const postaddress = useRef();
    const address = useRef();

    const redirect = useNavigate();

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/add/useraddress/');
            if (response.data.redirect){
                return redirect(`${response.data.redirect}`)
            };
        };
        fetchData();
    },[])


    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:8000/api/ecommerce/add/useraddress/',
        {'city':city.current.value,'post_address':postaddress.current.value,'address':address.current.value},
        {headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        }});
        if (response.data.success){
            return redirect('/accounts/')
        }
    }

    return ( 
        <div className="register-container">
            <form onSubmit={e=>handleSubmit(e)}>
                <div className="register-input-container">
                    <div>
                        <div className="my-3">City</div>
                        <div className="my-4">Postaddress</div>
                        <div className="my-4">Address</div>
                    </div>
                    <div>
                        <input ref={city} className="register-input my-1" type="text" placeholder="City"/>
                        <input ref={postaddress} className="register-input my-1" type="text" placeholder="Postaddress"/>
                        <textarea ref={address} className="register-textarea my-1" placeholder="Address ..." rows={4}></textarea>
                    </div>
                </div>
                <div className="address-submit-container">
                    <div><input type="submit" name="register" className="btn btn-info"/></div>
                </div>
            </form>
        </div>
     );
}
 
export default AddAddress;