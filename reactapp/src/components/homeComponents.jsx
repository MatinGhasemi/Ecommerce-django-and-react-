import { Link } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel'


const HomeComponents = () => {
    return ( 
        <>
            <Carousel className='mt-1'>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://dkstatics-public.digikala.com/digikala-adservice-banners/15dd02160af047225ba62b403dc0989a23b00ee0_1705305177.gif?x-oss-process=image"
                  alt="First slide"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='https://dkstatics-public.digikala.com/digikala-adservice-banners/bff0f3cd9e0c90ed49df416f4b878c7e196715fa_1704284622.jpg?x-oss-process=image/quality,q_95'
                  alt="First slide"
                ></img>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://dkstatics-public.digikala.com/digikala-adservice-banners/5e28e5a14271193ede172872f1cb1eb2e09ece0c_1705488996.jpg?x-oss-process=image/quality,q_95"
                  alt="First slide"
                ></img>
              </Carousel.Item>
            </Carousel>
            <div className='category-container'>
                <Link to='/category/HomeAndKitchen/'><div><img className='category-image' src="https://dkstatics-public.digikala.com/digikala-categories/3e3ec550569f974bc7e9d78c30b48612e5b1c606_1701193057.png" alt="" /></div></Link>
                <Link to='/category/HealthAndCare/'><div><img className='category-image' src="https://dkstatics-public.digikala.com/digikala-categories/c2957abd1f437415eceb6428c7dce93ef3ee7495_1701193097.png" alt="" /></div></Link>
                <Link to='/category/Style/'><div><img className='category-image' src="https://dkstatics-public.digikala.com/digikala-categories/1fad42c6177e71db1a368e258c5bc004d6073a3a_1701193064.png" alt="" /></div></Link>
                <Link to='/category/Digital/'><div><img className='category-image' src="https://dkstatics-public.digikala.com/digikala-categories/510816e9ec4cbfad2edbff2763e2059a504e571b_1701193038.png" alt="" /></div></Link>
                <Link to='/category/Transformation/'><div><img className='category-image' src="https://dkstatics-public.digikala.com/digikala-categories/ac63c44ab551dc24421aea53b92686a2f72906ff_1701193119.png" alt="" /></div></Link>
            </div>
            <div className="category-container">
                <div className='text-white'>خانه و آشپزخانه</div>
                <div className='text-white'>زیبایی و سلامت</div>
                <div className='text-white'>مد و پوشاک</div>
                <div className='text-white'>دیجیتال</div>
                <div className='text-white'>خودرو و موتورسیکلت</div>
            </div>
            <br />
            <br />
            <div className='news-container'>
              <div className='news'>
                <div className='news-img-container'><img className='pointer news-img' src="https://images-na.ssl-images-amazon.com/images/I/713xlrTR2AL._SL1500_.jpg" alt="" /></div>
                <div className='news-img-container'><img className='pointer news-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Varjin.jpg/284px-Varjin.jpg" alt="" /></div>
                <div className='news-img-container'><img className='pointer news-img' src="https://hedisha.com/wp-content/uploads/2024/01/mkl-510x510.jpg" alt="" /></div>
              </div>
              <div className="news">
                <div>باشگاه خونگی</div>
                <div>کوهنوردی</div>
                <div>کادو ولنتاین</div>
              </div>
            </div>
        </>
     );
}
 
export default HomeComponents;