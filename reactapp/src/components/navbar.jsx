import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";

import { FiAlignJustify,FiShoppingCart,FiSearch,FiYoutube,FiInstagram,FiSend,FiXCircle } from "react-icons/fi";


const TopNavbar = () => {
  let [product,setProduct] = useState([]);

  const bar = useRef();
  const Input = useRef();
  const cartNumber = useRef();


  useEffect(()=>{
    const fetchData = async()=>{
      const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/cart/');
      cartNumber.current.innerText = response.data.orders.orderitem_set?.length
    };
    fetchData();
  },[])
  

  const openBar = ()=>{
    bar.current.style.left = '0';
  }
  const closeBar = ()=>{
    bar.current.style.left = '-300px';
  }

  const searchProduct =async (e)=>{
    let response = await axios.get(`http://127.0.0.1:8000/api/ecommerce/searchproduct?q=${e.target.value}`);
    setProduct(response.data)
  }

  const handleClick = async ()=>{
    Input.current.value = '';
    let response = await axios.get(`http://127.0.0.1:8000/api/ecommerce/searchproduct?q=`);
    setProduct(response.data);
  }


  return (
    <>
      <div className="top-navbar">
        <div ref={cartNumber} className="cart-items">0</div>
        <div className="left-icons"><FiAlignJustify onClick={openBar} className="fi-icons"/><Link to={'/accounts/cart/'}><FiShoppingCart className="mx-2 text-dark fi-icons"/></Link></div>
        <div className="input-container"><input ref={Input} className="search-input" onChange={e => searchProduct(e)} type="text" placeholder="Search ..." /><div className="fi-icon-search"><FiSearch className="fi-icons"/></div></div>
        <div className="right-icons"><FiInstagram className="fi-icons mx-2"/><FiYoutube className="fi-icons"/><FiSend className="fi-icons mx-2"/></div>
      </div>
      <div className="search-result bg-dark">
        {product.map((p)=>{
          return(
            <>
              <Link className="text-white" style={{textDecoration:'none'}} to={`/product/${p.id}/`} onClick={handleClick}><div className="d-flex justify-content-around mt-2">
                <div><img className="search-result-image" src={p.imageURL} alt="" /></div>
                <div className="">{p.name}</div>
              </div></Link>
              <hr className="mx-3" />
            </>
          )
        })}
      </div>
      <div ref={bar} className="bg-dark right-navbar">
        <div style={{position:'absolute',left:'10px',top:'5px'}}><FiXCircle onClick={closeBar} className="fi-icons"/></div>
        <Link to={'/accounts/'} style={{color:'white',textDecoration:'none'}} onClick={closeBar}><div className="mb-4 f-big c-pointer"><b>اکانت</b></div></Link>
        <Link style={{textDecoration:'none',color:'white'}} onClick={closeBar} to='/category/HomeAndKitchen/'><div></div><div className="c-pointer">خانه و آشپزخانه</div></Link>
        <Link style={{textDecoration:'none',color:'white'}} onClick={closeBar} to='/category/HealthAndCare/'><div></div><div className="c-pointer">زیبایی و سلامت</div></Link>
        <Link style={{textDecoration:'none',color:'white'}} onClick={closeBar} to='/category/Style/'><div></div><div className="c-pointer">مد و پوشاک</div></Link>
        <Link style={{textDecoration:'none',color:'white'}} onClick={closeBar} to='/category/Digital/'><div></div><div className="c-pointer">موبایل</div></Link>
        <Link style={{textDecoration:'none',color:'white'}} onClick={closeBar} to='/category/Transformation/'><div></div><div className="c-pointer">خودرو و موتورسیکلت</div></Link>
      </div>
    </>
  );
}
 
export default TopNavbar;