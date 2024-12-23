import React from 'react';
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import psdchain from "../imgs/blockchain.png"

const CenterChain = () => {
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
                         <img src={psdchain} alt="PSD-Blockchain" className="img-fluid" />
                        </div>
                    </div>
                    <div className='lg:w-1/2'>
                        <h1 className='text-3xl font-bold lg:text-6xl'>
                            Welcome to Cryptography and Blockchain Center of Information
                        </h1>
    
                        <p className='text-gray-500 mt-5 mb-5 text-xl'>
                        Jelajahi dunia keamanan informasi dengan kami. Temukan solusi kriptografi dan blockchain terbaru untuk melindungi data Anda. Dapatkan pengetahuan mendalam dan aplikasi praktis di sini!
                        </p>
                    </div>
    

                </div>
                <div>
                    <h3 className="mb-3 text-center">Coming Soon...</h3>
                    <div className="button-container">
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/feedback/cryptography-blockchain" onClick={handleNavLinkClick}>
                            Feedback
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/cryptography-blockchain" onClick={handleNavLinkClick}>
                            FAQ
                        </Link>
                    </div>
                </div>

        </AnimationWrapper>
    )
}

export default CenterChain;