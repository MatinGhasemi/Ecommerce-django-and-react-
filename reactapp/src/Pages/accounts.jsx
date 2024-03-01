import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

import {FiArrowLeft, FiUser, FiArrowDown, FiArrowRight} from 'react-icons/fi'

import TopNavbar from "../components/navbar";
import Footer from '../components/footer';


const Accounts = () => {
    const [user,setUser] = useState({});
    const [address,setAddress] = useState({});
    const [cart,setCart] = useState([]);

    const redirect = useNavigate();
    
    const itemContainer = useRef();


    useEffect(()=>{
        const fetchData = async()=>{
            let response = await axios.get('http://127.0.0.1:8000/api/ecommerce/accounts/');
            if (response.data.redirect){
                return redirect(response.data.redirect);
            }
            setUser(response.data.user);
            setAddress(response.data.address);
            setCart(response.data.cart)
        };
        fetchData();
    },[])


    const noItem = ()=>{
        if (cart.length == 0){
            return <div style={{height:'50vh'}} ></div>
        }
    }
    
    return ( 
        <>
            <TopNavbar />
            <Link to={'/'} ><FiArrowLeft className='arrow-left'/></Link>
            <Link to={'/edit/useraddress/'} className="edit-info-btn btn btn-outline-info">Edit Information</Link>
            <div className="user-info-container">
                <div><FiUser className="fi-user"/></div>
                <div className="user-info">
                    <div>Name : {user.first_name} {user.last_name}</div>
                    <div>PhoneNumber : {user.telephone}</div>
                    <div>Address : <span>{address.address}</span></div>
                </div>
            </div>
            <hr className="text-white mx-5 my-3"/>
            {noItem()}
            <div style={{color:'white',marginBottom:"400px"}}>
                {cart && cart.map((order)=>{
                    return (
                        <>
                            <div className="payed-order-time"><div className="payed-order-time-in"><FiArrowDown size={22}/>{order.buyed_time.slice(0,10)}<FiArrowDown size={22}/></div></div>
                            <div className="payed-products-container">
                                <div className="slider">
                                {order.cart.orderitem_set.map((o)=>{
                                    return (
                                            <Link style={{textDecoration:"none"}} to={`/product/${o.product.id}/`}>
                                            <div className="askdoaskdo">
                                                <div>
                                                    <img className="payed-img" src={o.product.imageURL} alt="" />
                                                </div>
                                                <div className="text-center">{o.product.name}</div>
                                                <div className="text-center">quantity = {o.quantity}</div>
                                                <div className="text-center">total = {o.get_total}$</div>
                                            </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </> 
                    )
                })}
            </div>
            <Footer />
        </>
     );
}
 
export default Accounts;