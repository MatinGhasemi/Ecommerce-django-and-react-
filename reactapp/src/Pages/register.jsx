import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import csrftoken from "../components/csrfToken";

import { FiArrowLeft } from "react-icons/fi";


const Register = () => {
    const [response,setResponse] = useState(null);

    const redirect = useNavigate();
    
    const RegisterContainer = useRef();
    const first_name = useRef();
    const username = useRef();
    const email = useRef();
    const telephone = useRef();
    const password = useRef();
    const re_password = useRef();

    const passwordLogin = useRef();
    const usernameLogin = useRef();
    const LoginContainer = useRef();

    const Varification = useRef();
    const VarificationInput = useRef();

    const loader = useRef();
    const loader1 = useRef();
    const login = useRef();
    const register = useRef();

    const nameLabel = useRef();
    const emailLabel = useRef();
    const usernameLabel = useRef();
    const telephoneLabel = useRef();
    const passwordLabel = useRef();
    const re_passwordLabel = useRef();
    const uLabel = useRef();
    const pLabel = useRef();


    const loginUPlaceholder = ()=>{if (usernameLogin.current.value.length!=0){
        uLabel.current.style.top = '-22px'        
        uLabel.current.style.color = 'white'
        uLabel.current.style.opacity = '1'
    }else{uLabel.current.style.top = '2px'
        uLabel.current.style.color = 'black'
        uLabel.current.style.opacity = '0.5'}}
    const loginPPlaceholder = ()=>{if (passwordLogin.current.value.length!=0){
        pLabel.current.style.top = '-22px'        
        pLabel.current.style.color = 'white'
        pLabel.current.style.opacity = '1'
    }else{pLabel.current.style.top = '2px'
        pLabel.current.style.color = 'black'
        pLabel.current.style.opacity = '0.5'}}
    const namePlaceholder = ()=>{if (first_name.current.value.length!=0){
        nameLabel.current.style.top = '-22px'        
        nameLabel.current.style.color = 'white'
        nameLabel.current.style.opacity = '1'
    }else{nameLabel.current.style.top = '2px'
        nameLabel.current.style.color = 'black'
        nameLabel.current.style.opacity = '0.5'}}
    const emailPlaceholder = ()=>{if (email.current.value.length!=0){
        emailLabel.current.style.top = '-22px'        
        emailLabel.current.style.color = 'white'
        emailLabel.current.style.opacity = '1'
    }else{emailLabel.current.style.top = '2px'
        emailLabel.current.style.color = 'black'
        emailLabel.current.style.opacity = '0.5'}}
    const usernamePlaceholder = ()=>{if (username.current.value.length!=0){
        usernameLabel.current.style.top = '-22px'        
        usernameLabel.current.style.color = 'white'
        usernameLabel.current.style.opacity = '1'
    }else{usernameLabel.current.style.top = '2px'
        usernameLabel.current.style.color = 'black'
        usernameLabel.current.style.opacity = '0.5'}}
    const telephonePlaceholder = ()=>{if (telephone.current.value.length!=0){
        telephoneLabel.current.style.top = '-22px'        
        telephoneLabel.current.style.color = 'white'
        telephoneLabel.current.style.opacity = '1'
    }else{telephoneLabel.current.style.top = '2px'
        telephoneLabel.current.style.color = 'black'
        telephoneLabel.current.style.opacity = '0.5'}}
    const passwordPlaceholder = ()=>{if (password.current.value.length!=0){
        passwordLabel.current.style.top = '-22px'        
        passwordLabel.current.style.color = 'white'
        passwordLabel.current.style.opacity = '1'
    }else{passwordLabel.current.style.top = '2px'
        passwordLabel.current.style.color = 'black'
        passwordLabel.current.style.opacity = '0.5'}}
    const re_passwordPlaceholder = ()=>{if (re_password.current.value.length!=0){
        re_passwordLabel.current.style.top = '-22px'        
        re_passwordLabel.current.style.color = 'white'
        re_passwordLabel.current.style.opacity = '1'
    }else{re_passwordLabel.current.style.top = '2px'
        re_passwordLabel.current.style.color = 'black'
        re_passwordLabel.current.style.opacity = '0.5'}}


    const submitRegister = async(e)=>{
        e.preventDefault();

        loader.current.style.display = 'flex';
        register.current.style.display = 'none';

        const formData = new FormData();
        formData.append('first_name',first_name.current.value);
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
            RegisterContainer.current.style.display = 'none';
            LoginContainer.current.style.display = 'none';
            Varification.current.style.display = 'block';

        }else if (response.data.error){
            setResponse(response.data.error)
            loader.current.style.display = 'none';
            register.current.style.display = 'block';
        }
        
    }

    const submitLogin = async(e)=>{
        e.preventDefault();

        loader1.current.style.display = 'flex';
        login.current.style.display = 'none';

        const response = await axios.post('http://127.0.0.1:8000/api/ecommerce/login/',
        {'username':usernameLogin.current.value,'password':passwordLogin.current.value},
        {headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        }});
        
        if (response.data.success){
            RegisterContainer.current.style.display = 'none';
            LoginContainer.current.style.display = 'none';
            Varification.current.style.display = 'block';
        }else if (response.data.error){
            setResponse(response.data.error)
            loader1.current.style.display = 'none';
            login.current.style.display = 'block';
        }
    }

    const varificationSubmit = async()=>{
        function getCookie(name) {
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
        const token = getCookie('csrftoken');

        const response = await axios.post('http://127.0.0.1:8000/api/ecommerce/varification/',
        {'code':VarificationInput.current.value},
        {headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':token
        }});
        console.log(response.data)
        if (response.data.success){
            return redirect("/accounts/");
        }
    }


    const openLogin = ()=>{
        LoginContainer.current.style.top = '0';
        RegisterContainer.current.style.top = '-620px';
    }   

    const openRegister = ()=>{
        LoginContainer.current.style.top = '-620px';
        RegisterContainer.current.style.top = '0';
    }   


    const error = ()=>{
        if (response != null){
            return (
                <div className="alert-index alert alert-danger my-4 mx-5">
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
            <img className="register-background" src={require("../images/happy shoping.jpg")} alt="background" />
            {error()}
            <Link to={'/'} ><FiArrowLeft className='arrow-left-r'/></Link>
            <div ref={RegisterContainer} className="register-container">
                <form onSubmit={e=>submitRegister(e)}>
                    <div className="register-container-text">WELCOME TO <span className="color-text">ECOMMERCE</span></div>    
                    <div className="register-input-container"><input onChange={namePlaceholder} ref={first_name} className="register-input" type="text" /><span ref={nameLabel} className="register-placeholder">Name</span></div>
                    <div className="register-input-container"><input onChange={emailPlaceholder} ref={email} className="register-input" type="text" /><span ref={emailLabel} className="register-placeholder">Email</span></div>
                    <div className="register-input-container"><input onChange={usernamePlaceholder} ref={username} className="register-input" type="text" /><span ref={usernameLabel} className="register-placeholder">Username</span></div>
                    <div className="register-input-container"><input onChange={telephonePlaceholder} ref={telephone} className="register-input" type="text" /><span ref={telephoneLabel} className="register-placeholder">Telephone</span></div>
                    <div className="register-input-container"><input onChange={passwordPlaceholder} ref={password} className="register-input" type="password" /><span ref={passwordLabel} className="register-placeholder">Password</span></div>
                    <div className="register-input-container"><input onChange={re_passwordPlaceholder} ref={re_password} className="register-input" type="password" /><span ref={re_passwordLabel} className="register-placeholder">Re-Password</span></div>
                    <div className="submit-container">
                        <button type="submit">
                            <span ref={register} className="login">Register</span>
                            <span ref={loader} className="loader"><div></div><div></div><div></div><div></div><div></div></span>
                        </button>
                    </div>
                    <div className="reminder-text">If You Dont Have Account Click <span onClick={openLogin} className="here">Here</span> !</div>
                </form>
            </div>
            <div ref={LoginContainer} className="login-container">
                <form onSubmit={e=>submitLogin(e)}>
                    <div className="register-container-text">WELCOME TO <span className="color-text">ECOMMERCE</span></div>
                    <div className="register-input-container"><input onChange={loginUPlaceholder} ref={usernameLogin} className="register-input" type="text" /><span ref={uLabel} className="register-placeholder">Username</span></div>
                    <div className="register-input-container"><input onChange={loginPPlaceholder} ref={passwordLogin} className="register-input" type="password" /><span ref={pLabel} className="register-placeholder">Password</span></div>
                    <div className="submit-container">
                        <button type="submit">
                            <span ref={login} className="login">Login</span>
                            <span ref={loader1} className="loader"><div></div><div></div><div></div><div></div><div></div></span>
                        </button>
                    </div>
                    <div className="reminder-text">If You Dont Have Account Click <span onClick={openRegister} className="here">Here</span> !</div>
                </form>
            </div>
            <div ref={Varification} className="verification-container">
                <div className="verification-input">
                    <div className="my-1">We Send a 6 Character Code to your email</div>
                    <input ref={VarificationInput} className="my-1" type="text" placeholder="Code ..."/>
                    <div><button className="my-1 btn btn-primary" onClick={varificationSubmit}>Submit</button></div>
                </div>
            </div>
        </>
     );
}
 
export default Register;