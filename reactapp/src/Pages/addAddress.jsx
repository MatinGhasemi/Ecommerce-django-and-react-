import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
    const [response,setResponse] = useState(null);

    const city = useRef();
    const postaddress = useRef();
    const address = useRef();

    const redirect = useNavigate();


    const getCookie = (name)=> {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


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
        const csrftoken = getCookie('csrftoken');
        
        const response = await axios.post('http://127.0.0.1:8000/api/ecommerce/add/useraddress/',
        {'city':city.current.value,'post_address':postaddress.current.value,'address':address.current.value},
        {headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        }});
        if (response.data.success){
            return redirect('/accounts/')
        }else if (response.data.error){
            setResponse(response.data.error)
        }
    }

    const error = ()=>{
        if (response != null){
            return ( <div className="alert alert-danger mx-5">{response}</div> )
        }
    }

    return ( 
        <>
            {error()}
            <img src={require('../images/product world.jpg')} alt="background" className="address-background" />
            <div className="address-container">
                <form onSubmit={e=>handleSubmit(e)}>
                    <div>
                        <div className="text-center color-text ">Ecommerce</div>
                        <div>
                            <div className="mx-2">City</div>
                            <div className="address-input-container">
                                <input ref={city} className="address-input" type="text" placeholder="City"/>
                            </div>
                            <div className="mx-2">Postaddress</div>
                            <div className="address-input-container">
                                <input ref={postaddress} className="address-input" type="text" placeholder="Postaddress"/>
                            </div>
                            <div className="mx-2">Address</div>
                            <div className="address-input-container">
                                <textarea ref={address} className="address-textarea" placeholder="Address ..." rows={4}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="edit-submit-container">
                        <div><input type="submit" name="register" className="address-btn"/></div>
                    </div>
                </form>
            </div>
        </>
     );
}
 
export default AddAddress;