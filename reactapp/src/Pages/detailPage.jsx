import axios from 'axios';
import { useEffect, useRef, useState} from 'react';
import Cookie from 'js-cookie';
import {Link,useParams} from 'react-router-dom';

import {FiArrowLeft, FiX} from 'react-icons/fi';

import TopNavbar from "../components/navbar";
import Footer from '../components/footer';
import csrftoken from '../components/csrfToken';



const Detail = () => {
    const [user,setUser] = useState({});
    const [product,setProduct] = useState({});
    const [response,setResponse] = useState({});
    const [comments,setComments] = useState([]);
    const [category,setCategory] = useState([]);

    const id = useParams().id;
    
    const Modal = useRef();
    const Name = useRef();
    const Email = useRef();
    const Review = useRef();


    useEffect(()=>{
        const fetchData = async()=>{
        const response = await axios.get(`http://127.0.0.1:8000/api/ecommerce/product/${id}/`);
        const coment_res = await axios.get(`http://127.0.0.1:8000/api/ecommece/addcomment/${id}/`);
        const category = await axios.get(`http://127.0.0.1:8000/api/ecommerce/product/related/categoty/${id}/`);
        setProduct(response.data.product);
        setUser(response.data.user);
        setComments(coment_res.data);
        setCategory(category.data)
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
        }
    }


    const showResponse = ()=>{
        if (response.success){
            return(
                <div className="my-alert success">
                  <strong>{response.success}</strong>
                </div>

            )
        }else if (response.error){
            return (
                <div className="my-alert error">
                    {response.error.name ? <div>لطفا نام خود را به درستی وارد کنید</div> : <div className="d-none"></div>}
                    {response.error.email ? <div>لطفا ایمیل خود را به درستی وارد کنید</div> : <div className="d-none"></div>}
                    {response.error.comment ? <div>لطفا کامنت خود را به درستی وارد کنید</div> : <div className="d-none"></div>}
                </div>
            )
        }
    }

    const openModal = ()=>{
        Modal.current.style.display = 'block';
    }
    const closeModal = ()=>{
        Modal.current.style.display = 'none';
    }

    const addComent = async(e)=>{
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('product',id)
        formData.append('name',Name.current.value);
        formData.append('email',Email.current.value);
        formData.append('comment',Review.current.value);

        const response = await axios({
            url:`http://127.0.0.1:8000/api/ecommece/addcomment/${id}/`,
            method:'POST',
            headers :{
                'Content-Type':'multipart/form-data',
                'Accept':'application/json',
                'X-CSRFToken':csrftoken,
            },
            data:formData
        })
        setResponse(response.data)
        Modal.current.style.display = 'none';
    }


    return ( 
        <>  
            <TopNavbar />
            <div ref={Modal} className="handmade-modal">
                <FiX className='pointer arrow-left' onClick={closeModal}/>
                <form onSubmit={e=>addComent(e)} className='comment-form'>
                    <div className='comment-container'>
                        <div className='comment-label'>
                            <div className="my-2">نام کاربری : </div>
                            <div className="my-2">ایمیل : </div>
                            <div className="my-4">نظرات :</div>
                        </div>
                        <div>
                            <div><input ref={Name}  type="text"  className='input my-2' placeholder='نام کاربری'/></div>
                            <div><input ref={Email}  type="email" className='input my-2' placeholder='ایمیل'/></div>
                            <textarea ref={Review} className='input-area my-2' rows="3" placeholder='نظر شما'></textarea>
                        </div>
                    </div>
                    <div className='text-center mt-2'><input type="submit" className='btn btn-outline-info' /></div>
                </form>
            </div>
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
                    <div><button className="btn btn-lg btn-outline-info" onClick={openModal}>نظرات</button></div>
                </div>
            </div>
            <hr className='mx-3 mt-5 text-white'/>
            <div className='simlar-review mx-4'>
                <div>
                    <div>نظرات :</div>
                    <div className='review'>
                        {comments.length ==0 ? <div className='py-5 text-center'>برای این محصول نظری ثبت نشده</div> : comments.map((comment)=>{
                            return (
                                <>
                                    <div className='mx-2'>{comment.name}</div>
                                    <hr className="mx-4" />
                                    <div className='mx-1'>{comment.comment}</div>
                                    <hr />
                                </>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <div>محصولات مشابه :</div>
                    <div className='simlar'>
                        {category.map((p)=>{
                            return <div><Link to={`/product/${p.id}/`}><img className='simlar-img' src={p.imageURL} /></Link></div>
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
     );
}
 
export default Detail;