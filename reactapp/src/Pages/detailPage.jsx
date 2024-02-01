import axios from 'axios';
import { useEffect, useState} from 'react';
import Cookie from 'js-cookie';
import {Link,useParams} from 'react-router-dom';

import {FiArrowLeft} from 'react-icons/fi';

import TopNavbar from "../components/navbar";
import Footer from '../components/footer';
import csrftoken from '../components/csrfToken';



const Detail = () => {
    const [user,setUser] = useState({});
    const [product,setProduct] = useState({});
    const [response,setResponse] = useState({});
    const id = useParams().id;


    useEffect(()=>{
        const fetchData = async()=>{
        const response = await axios.get(`http://127.0.0.1:8000/api/ecommerce/product/${id}/`);
        setProduct(response.data.product);
        setUser(response.data.user);
        };
        fetchData();
    },[id])


    const addCart = async(id)=>{
        if (user === 'AnonymousUser'){
            try {
                let cart = JSON.parse(Cookie.get('cart'));
                if (cart[id] == undefined){
                    cart[id] = {'q':1}
                    document.cookie = 'cart='+JSON.stringify(cart);
                }else{
                    cart[id]['q'] +=1
                    document.cookie = 'cart='+JSON.stringify(cart);
                }
            } catch{
                let cart = Cookie.get('cart')
                if (cart == undefined){
                    cart = {[id]:{'q':1}}
                    document.cookie = 'cart='+JSON.stringify(cart);
            }}
        }else{
            const response = await axios.post('http://127.0.0.1:8000/api/ecommerce/cart/',{'id':id},{headers:{
                'X-CSRFToken':csrftoken,
            }})
            setResponse(response.data)
        }
    }


    const showResponse = ()=>{
        if (response.success){
            return(
                <>
                    <div className="alert alert-success">
                      <strong>{response.success}</strong>
                    </div>
                </>
            )
        }else if (response.error){
            return (
                <>
                    <div className="mx-5 mb-2 alert alert-danger">
                      <strong>{response.error}</strong>
                    </div>
                </>
            )
        }
    }


    return ( 
        <>  
            <TopNavbar />
            {showResponse()}
            <Link to={'/'} ><FiArrowLeft className='arrow-left'/></Link>
            <div className='product-d-container'>
                <div className='hachure'></div>
                <div className='product-detail-img-container'>
                    <img className='product-detail-img' src={product.imageURL} alt="" />
                </div>
                <div className='product-overview'>{product.overview}</div>
                <div className='text-white text-center mt-5 mb-4'><b>{product.name}</b></div>
                <div className='addcart-review-price'>
                    <div className='price'><strong>{product.price}<span> $</span></strong></div>
                    <div className="addcart"><Link onClick={e=>addCart(product.id)} className='btn btn-lg btn-danger '>افزودن به سبد خرید</Link></div>
                    <div className="review"><button className="btn btn-lg btn-outline-info">نظرات</button></div>
                </div>
            </div>
            <hr className='mx-3 mt-5 text-white'/>
            <div className='simlar-review mx-4'>
                <div>نظرات :</div>
                <div>محصولات مشابه :</div>
            </div>
            <Footer />
        </>
     );
}
 
export default Detail;