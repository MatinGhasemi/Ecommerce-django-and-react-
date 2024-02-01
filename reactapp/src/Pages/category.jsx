import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import Cookie from "js-cookie";

import { FiArrowLeft } from "react-icons/fi";

import TopNavbar from "../components/navbar";
import Footer from '../components/footer';
import csrftoken from "../components/csrfToken";


const CategoryView = () => {
    const [user,setUser] = useState({});
    const [product,setProduct] = useState([]);
    const category = useParams().category;
    

    useEffect(()=>{
        const fetchData = async ()=>{
            const response =await axios.get(`http://127.0.0.1:8000/api/ecommerce/product/categoty/${category}/`);
            setProduct(response.data.products);
            setUser(response.data.user)
        };
        fetchData();
    },[category])


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
        }
    }

    return ( 
        <>  
            <TopNavbar />
            <Link to={'/'} ><FiArrowLeft className='arrow-left'/></Link>
            <div className='products-container'>
                {product && product.map((p)=>{
                    return (
                        <>
                            <div className='single-product-container'>
                                <Link to={`product/${p.id}`} ><img className='product-image' src={p.imageURL} alt="product" /></Link>
                                
                                <div className='product-detail-container mt-2'>
                                    <div className='product-detail text-white'>{p.name}</div>
                                    <div className='product-detail text-white'>{p.price}$</div>
                                    <div className='products-btn'>
                                        <Link onClick={e=>addCart(p.id)} className='btn btn-outline-danger'>خرید</Link><Link to={`product/${p.id}`} className='btn btn-outline-success'>مشاهده</Link>
                                    </div>
                                </div>

                            </div>
                        </>
                    )
                })}
            </div>
            <div style={{height:'40vh'}}></div>
            <Footer />
        </>
     );
}
 
export default CategoryView;