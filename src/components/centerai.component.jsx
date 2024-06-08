import React from 'react';
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import psdai from "../imgs/banner.png"

const CenterAI = () => {
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
                    <div className='lg:w-1/2 w-auto'>
                        <div className='banner-img position-relative w-auto'>
                         <img src={psdai} alt="PSD-AI" className="img-fluid" />
                        </div>
                    </div>
                    <div className='lg:w-1/2'>
                        <h1 className='text-3xl font-bold lg:text-6xl'>
                            Welcome to Artificial Intelligence Center of PSD
                        </h1>
    
                        <p className='text-gray-500 mt-5 mb-5 text-xl'>
                            Pusat Teknologi AI untuk Anggota Projek Sains Data. Tanyakan dan buat Rekomendasi Artikel dengan AI, buat Cover Artikel dengan AI, dan selesaikan tantangan atau latihan pada topik pilihan anda dengan AI. Productivity meet AI!
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="mb-3 text-center">Use our AI Tools for Your Productivity</h3>
                    <div className="button-container">
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/ai/tanya-psd" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-brain-circuit text-xl mr-3"></i> PSD-GPT
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3 " to="/ai/cover" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-graphic-style text-xl mr-3"></i> PSD-Cover
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/ai/my-quizai" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-quiz text-xl mr-3"></i> PSD-Quizai
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/feedback/ai-center" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-review text-xl mr-3"></i> Feedback
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/ai-center" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-interrogation text-xl mr-3"></i> FAQ
                        </Link>
                    </div>
                </div>

        </AnimationWrapper>
    )
}

export default CenterAI;