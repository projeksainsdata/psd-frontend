import React from 'react';
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import psdlearn from "../imgs/learn2.png"

const CenterLearn = () => {
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
                            Welcome to PSD-Learn
                        </h1>
    
                        <p className='text-gray-500 mt-5 mb-5 text-xl'>
                            Here you'll find a variety of articles and tutorials on topics such as Data Science,
                            Data Engineering, Big Data, Data Analysis, Artificial Intelligence, Science, and
                            Technology Data and Computing.
                        </p>
                    </div>
    
                    <div className='lg:w-1/2 w-auto'>
                        <div className='banner-img position-relative w-auto'>
                         <img src={psdlearn} alt="PSD-Learn" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row mb-8'>
                    <div className='lg:w-1/2 w-auto mb-6 text-center'>
                                <Link className="text-xl text-light-green justify-center mb-6 py-2 mr-3" to="/learn/dasar" onClick={handleNavLinkClick}>
                                    <i className='fi fi-rr-track' /> Buat Roadmap belajar kamu disini!
                                </Link>
                    </div>
                    <div className='lg:w-1/2 w-auto mb-4 text-center'>
                                <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                                    <i className="fi fi-rr-biking-mountain text-xl mr-3"></i> Try Exercise Tools
                                </Link>
                    </div>
                </div>
                <div>
                    <h3 className="mb-3 text-center">Start Learning Now</h3>
                    <div className="button-container">
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/dasar" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-calculator-simple text-xl mr-3"></i> Dasar
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3 " to="/learn/analitik" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-square-poll-vertical text-xl mr-3"></i> Analitik
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/desain" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-microchip text-xl mr-3"></i> Desain
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/sistem" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-database text-xl mr-3"></i> Sistem
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/iot" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-sensor-on text-xl mr-3"></i> IoT
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/robotik" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-robot text-xl mr-3"></i> Robotik
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/nilai" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-unlock text-xl mr-3"></i> Nilai
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/feedback/learn" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-review text-xl mr-3"></i> Feedback
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-interrogation text-xl mr-3"></i> FAQ
                        </Link>
                    </div>
                </div>

        </AnimationWrapper>
    )
}

export default CenterLearn;