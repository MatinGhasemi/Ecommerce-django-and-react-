import axios from "axios";
import { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {FiArrowLeft,FiTriangle} from 'react-icons/fi';
import Cookie from "js-cookie";

import TopNavbar from "../components/navbar";
import Footer from "../components/footer";
import csrftoken from "../components/csrfToken";

const Cart = () => {
    const [items,setItems] = useState({});
    const [user,setUser] = useState('');
    const [change,setChange] = useState(null);

    const redirect = useNavigate();


    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/cart/');
            setItems(response.data.orders);
            setUser(response.data.user);
        };
        fetchData();
    },[change])


    const noItem = ()=>{
        if (items.orderitem_set?.length==0){
            return (
                <>
                    <h1 className="text-white my-5 text-center">Cart Is Empty</h1>
                    <div className="empty"></div>
                </>
            )
        }
    }

    const productTotal = (p,q)=>{
        let sum = p*q
        return (
            <>{sum}</>
            )
    }

    const add = (id,q,pId)=>{
        if (user=='Authenticate'){
            let sum = q + 1
            axios.put('http://127.0.0.1:8000/api/ecommerce/cart/',{'method':'change','orderId':id,'quantity':sum},{headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken
            }});
            setChange(`${id+999}_${q+9999}`); 
        }else if (user=='AnonymousUser'){
            let cart = JSON.parse(Cookie.get('cart'));

            cart[pId]['q'] += 1
            document.cookie = 'cart='+JSON.stringify(cart);

            setChange(`${pId+999}_${q+9999}`); 
        }
    }
    
    const remove = (id,q,pId)=>{
        if (user=='Authenticate'){
            let sum = q - 1
            if (sum === 0){
                axios.put('http://127.0.0.1:8000/api/ecommerce/cart/',{'method':'remove','orderId':id},{headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken
                }});
            }else{
                axios.put('http://127.0.0.1:8000/api/ecommerce/cart/',{'method':'change','orderId':id,'quantity':sum},{headers:{
                    'Content-Type':'application/json',
                    'X-CSRFToken':csrftoken
                }});
            }
            setChange(`${id+999}_${q+9999}`);

        }else if (user=='AnonymousUser'){            
            let cart = JSON.parse(Cookie.get('cart'));

            if (cart[pId]['q'] == '1'){
                delete cart[pId]
            }else{
                cart[pId]['q'] -= 1
            }
            document.cookie = 'cart='+JSON.stringify(cart);

            setChange(`${pId+999}_${q+9999}`); 
        }
    }

    const payment = async(id)=>{
        const response = await axios.patch('http://127.0.0.1:8000/api/ecommerce/cart/',{'orderId':id},{headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        }});
        if (response.data.success){
            return redirect('/accounts/');
        }
    }


    const identity = ()=>{
        if (items.orderitem_set?.length!=0){
            if (user==='Authenticate'){
                return (
                    <Link className="btn btn-outline-danger" onClick={e =>payment(items.id)}>پرداخت</Link>
                )
            }else if (user==='AnonymousUser'){
                return (
                    <Link className="btn btn-danger" to={'/accounts/register/'} > لاگین </Link>
                )
            }
        }
    }

    const cartTotal = ()=>{
        if (user=='Authenticate'){
            if (items.orderitem_set?.length!=0){
                let arr = [];
                let sum = 0;
                items.orderitem_set?.map((o)=>{
                    arr.push(o.get_total);
                });
                for(let i=0;i<arr.length;i++){
                    sum += arr[i]
                }   
                return `${sum} $`
            }
        }
    }


    return ( 
        <>
            <TopNavbar />
            <Link to={'/'} ><FiArrowLeft className='arrow-left'/></Link>
            {noItem()}
            <div className="cart-items-container p-3">
                {items.orderitem_set && items.orderitem_set.map((order)=>{return (
                    <>
                        <div className="cart-orders mx-4">
                            <div><img className="cart-image" src={order.product.imageURL} alt="product" /></div>
                            <div>{order.product.name}</div>
                            <div>{order.quantity}<FiTriangle className="pointer" onClick={e=>add(order.id,order.quantity,order.product.id)} /><FiTriangle className="pointer" onClick={e=>remove(order.id,order.quantity,order.product.id)} style={{rotate:'180deg'}}/></div>
                            <div>{productTotal(order.product.price,order.quantity)} $</div>
                        </div>
                        <hr className="mx-5"/>
                    </>
                )})}
                <div className="cart-total-pay mx-4">
                    <div></div>
                    <div></div>
                    <div>{identity()}</div>
                    <div>{cartTotal()}</div>
                </div>
            </div>
            <Footer />
        </>
     );
}
 
export default Cart;