import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';

import HomeComponents from '../components/homeComponents';
import { Link } from 'react-router-dom';
import TopNavbar from '../components/navbar';
import Footer from '../components/footer';
import csrftoken from '../components/csrfToken';


const Home = () => {
    const [refreshItem,setRefreshItem] = useState(null);
    const [products,setProducts] = useState([]);
    const [user,setUser] = useState({});

    useEffect(()=>{
        async function fetchData(){
            const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/products/');
            setProducts(response.data.products);
            setUser(response.data.user)
        };
        fetchData();
    },[])


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
        setRefreshItem(id-10);
    }


    return ( 
        <>
            <TopNavbar refresh={refreshItem}/>
            <HomeComponents />
            <div className='products-container'>
                {products && products.map((product)=>{
                    return (
                        <>
                            <div className='single-product-container'>
                                <Link to={`product/${product.id}`} ><img className='product-image' src={product.imageURL} alt="product" /></Link>
                                
                                <div className='product-detail-container mt-2'>
                                    <div className='product-detail text-white'>{product.name}</div>
                                    <div className='product-detail text-white'>{product.price}$</div>
                                    <div className='products-btn'>
                                        <Link onClick={e=>addCart(product.id)} className='btn btn-outline-danger'>خرید</Link><Link to={`product/${product.id}`} className='btn btn-outline-success'>مشاهده</Link>
                                    </div>
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
 
export default Home;