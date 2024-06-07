import React from 'react';
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import psddt from "../imgs/psddt.png"

const CenterDT = () => {
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
                         <img src={psddt} alt="PSD-Craft" className="img-fluid" />
                        </div>
                    </div>
                    <div className='lg:w-1/2'>
                        <h1 className='text-3xl font-bold lg:text-6xl'>
                            Tryout Our Technology with Digital Twin AI
                        </h1>
    
                        <p className='text-gray-500 mt-5 mb-5 text-xl'>
                            Here you'll find a variety of articles and tutorials on topics such as Data Science,
                            Data Engineering, Big Data, Data Analysis, Artificial Intelligence, Science, and
                            Technology Data and Computing.
                        </p>
                    </div>
                </div>
                <div className='text-right mb-4'>
                    <Link className="text-xl text-light-green mb-6 py-2 mr-3" to="/learn/dasar" onClick={handleNavLinkClick}>
                        <i className='fi fi-sr-info' /> Our Webinar Digital Twin with AI
                    </Link>
                </div>
                <div>
                    <h3 className="mb-3 text-center">New AI Technology is Here</h3>
                    <div className="button-container">
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/center/craft/solution" onClick={handleNavLinkClick}>
                            <i className="ffi fi-ss-bulb text-xl mr-3"></i> Check our Solution
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/center/craft/contact-us" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-messages text-xl mr-3"></i> Contact Us
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/feedback/craft" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-review text-xl mr-3"></i> Feedback
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/craft" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-interrogation text-xl mr-3"></i> FAQ
                        </Link>
                    </div>
                </div>

        </AnimationWrapper>
    )
}

export default CenterDT;