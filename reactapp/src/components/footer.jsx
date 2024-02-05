
const Footer = () => {
    return ( 
        <>
            <div className='footer-offset'></div>
            <div className="footer-container">
                <div className="footer-topic">شرکت دانش و فناوری ایران</div>
                <div className='introdosing'>
                    <div>
                        <div>افتخارات : نزیک به نیم قرن سابقه کار در زمینه فروش و خدمات دهی به مردم عزیز</div>
                        <div>خدمات : فروش بهترین محصولات موجود در بازار</div>
                        <div>آدرس : منطقه 4 / تهرانپارس / شهرک امید / بلوک17 / طبقه14</div>
                        <div>شماره تماس : 9897654010</div>
                    </div>
                    <div>
                        <div>
                            <div className='mb-3 responsive-me'>برنامه نویس ارشد</div>
                            <div className='introdosing-me'>
                                <img className='me-image' src={require('../images/me.jpg')} alt="" />
                                <div>متین قاسمی هستم علاقه مند به برنامه نویسی تخصص من در برنامه نویسی سمت سرور است همچنین در رمینه سمت کاربر نیز درحال یادگیری هستم </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Footer;