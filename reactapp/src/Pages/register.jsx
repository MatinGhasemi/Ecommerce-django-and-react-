import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import csrftoken from "../components/csrfToken";

import { FiArrowLeft } from "react-icons/fi";


const Register = () => {
    const [response,setResponse] = useState(null);

    const redirect = useNavigate();

    const first_name = useRef();
    const last_name = useRef();
    const username = useRef();
    const email = useRef();
    const telephone = useRef();
    const password = useRef();
    const re_password = useRef();

    const passwordLogin = useRef();
    const usernameLogin = useRef();
    const LoginContainer = useRef();
    const RegisterContainer = useRef();


    const submitRegister = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name',first_name.current.value);
        formData.append('last_name',last_name.current.value);
        formData.append('username',username.current.value);
        formData.append('email',email.current.value);
        formData.append('telephone',telephone.current.value);
        formData.append('password1',password.current.value);
        formData.append('password2',re_password.current.value);

        const response = await axios({
            url : 'http://127.0.0.1:8000/api/ecommerce/register/',
            method : "POST",
            data : formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                'X-CSRFToken':csrftoken
              },
        });

        if (response.data.success){
            return redirect('/add/useraddress/')
        }else if (response.data.error){
            setResponse(response.data.error)
        }
        
    }

    const submitLogin = async(e)=>{
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:8000/api/ecommerce/login/',
        {'username':usernameLogin.current.value,'password':passwordLogin.current.value},
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


    const openLogin = ()=>{
        RegisterContainer.current.style.display = 'none';
        LoginContainer.current.style.display = 'block';
    }

    const openRegister = ()=>{
        RegisterContainer.current.style.display = 'block';
        LoginContainer.current.style.display = 'none';
    }

    const error = ()=>{
        if (response != null){
            return (
                <div className="alert alert-danger mx-5">
                    {response.email ? <div>email : {response.email}</div> : <div className="d-none"></div>}
                    {response.username ? <div>username : {response.username}</div> : <div className="d-none"></div>}
                    {response.telephone ? <div>telephone : {response.telephone}</div> : <div className="d-none"></div>}
                    {response.password1 ? <div>password1 : {response.password1}</div> : <div className="d-none"></div>}
                    {response.password2 ? <div>password2 : {response.password2}</div> : <div className="d-none"></div>}
                    {response.error ? <div>{response.error}</div> : <div className="d-none"></div>}
                </div>
            )
        }
    }


    return ( 
        <>
            <Link to={'/'} ><FiArrowLeft className='arrow-left'/></Link>
            {error()}
            <div ref={RegisterContainer} className="register-container">
                <form onSubmit={e=>submitRegister(e)}>
                    <div className="register-input-container">
                        <div>
                            <div className="my-2">First Name</div>
                            <div className="my-4">Last Name</div>
                            <div className="my-4">Username</div>
                            <div className="my-4">Email</div>
                            <div className="my-4">Telephone Number</div>
                            <div className="my-4">Password</div>
                            <div className="my-4">Re-password</div>
                        </div>
                        <div>
                            <input ref={first_name} className="register-input my-1" type="text" placeholder="First Name"/>
                            <input ref={last_name} className="register-input my-1" type="text" placeholder="Last Name"/>
                            <input ref={username} className="register-input my-1" type="text" placeholder="Username"/>
                            <input ref={email} className="register-input my-1" type="email" placeholder="Email"/>
                            <input ref={telephone} className="register-input my-1" type="number" placeholder="Telephone Number"/>
                            <input ref={password} className="register-input my-1" type="password" placeholder="Password"/>
                            <input ref={re_password} className="register-input my-1" type="password" placeholder="Re-password"/>
                        </div>
                    </div>
                    <div className="register-submit-container">
                        <div><input type="submit" name="Register" className="btn btn-info"/></div>
                        <div>If You Have Account Click <Link onClick={openLogin}>Here</Link> !</div>
                    </div>
                </form>
            </div>
            <div ref={LoginContainer} className="login-container">
                <form onSubmit={e=>submitLogin(e)}>
                    <div className="login-input-container">
                        <div>
                            <div className="my-3">Username</div>
                            <div className="my-4">Password</div>
                        </div>
                        <div>
                            <input ref={usernameLogin} className="login-input my-1" type="text" placeholder="Username"/>
                            <input ref={passwordLogin} className="login-input my-1" type="password" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="login-submit-container">
                        <div><input type="submit" name="Login" className="btn btn-danger"/></div>
                        <div>If You don't Have Account Click <Link onClick={openRegister}>Here</Link> !</div>
                    </div>
                </form>
            </div>
        </>
     );
}
 
export default Register;