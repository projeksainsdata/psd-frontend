import React from 'react';
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import psdconsul from "../imgs/psdconsul.png"

const CenterConsul = () => {
    const handleNavLinkClick = (e) => {
        if (!isUserLoggedIn()) {
            e.preventDefault();
            navigate('/signin');
        } else {
            setPageState(e.target.innerText);
        }
    };
    return (
            <AnimationWrapper>
                <div className='flex flex-col lg:flex-row gap-6 p-5 ml-30 px-3 max-w-6xl mx-auto'>
                    <div className='lg:w-1/2'>
                        <h1 className='text-3xl font-bold lg:text-6xl'>
                            Welcome to PSD-Consultation
                        </h1>
    
                        <p className='text-gray-500 mt-5 mb-5 text-xl'>
                        Solusi terbaik untuk masalah penelitian dan proyek Anda dengan data science. Hubungi kami untuk konsultasi ahli, optimasi data, dan inovasi teknologi. Jadikan proyek Anda sukses bersama PSD-Consultation!
                        </p>
                    </div>
    
                    <div className='lg:w-1/2 w-auto'>
                        <div className='banner-img position-relative w-auto'>
                         <img src={psdconsul} alt="PSD-Consultation" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="mb-3 text-center">We will Helping You to Achieve The Goals of Your Projects</h3>
                    <div className="button-container">
                        <Link className="btn-dark mb-6 py-2 mr-3" to="mailto:timpsd@projeksainsdata.com" onClick={handleNavLinkClick}>
                            <i className='fi fi-rr-envelope-plus'></i> Send Email to Us 
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/feedback/consulation" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-review text-xl mr-3"></i> Feedback
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/consultation" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-interrogation text-xl mr-3"></i> FAQ
                        </Link>
                    </div>
                </div>

        </AnimationWrapper>
    )
}

export default CenterConsul;