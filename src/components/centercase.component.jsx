import React from 'react';
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import psdcase from "../imgs/projectman.png"

const CenterCase = () => {
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
                            Welcome to PSD-Case Study
                        </h1>
    
                        <p className='text-gray-500 mt-5 mb-5 text-xl'>
                            Here you'll find a variety of articles and tutorials on topics such as Data Science,
                            Data Engineering, Big Data, Data Analysis, Artificial Intelligence, Science, and
                            Technology Data and Computing.
                        </p>
                    </div>
    
                    <div className='lg:w-1/2 w-auto'>
                        <div className='banner-img position-relative w-auto'>
                         <img src={psdcase} alt="PSD-Case-Study" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row mb-8'>
                    <div className='lg:w-1/2 w-auto mb-6 text-center'>
                                <Link className="text-xl text-light-green justify-center mb-6 py-2 mr-3" to="/learn/dasar" onClick={handleNavLinkClick}>
                                    <i className='fi fi-sr-info' /> Check here our Webinar Case-Study
                                </Link>
                    </div>
                    <div className='lg:w-1/2 w-auto mb-4 text-center'>
                                <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                                    <i className="fi fi-rr-review text-xl mr-3"></i> Feedback
                                </Link>
                                <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                                    <i className="fi fi-rr-interrogation text-xl mr-3"></i> FAQ
                                </Link>
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-center">Follow Our Solution to Your Case Study</h3>
                    <div className="button-container">
                    
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/dasar" onClick={handleNavLinkClick}>
                            Agricultural Science
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3 " to="/learn/analitik" onClick={handleNavLinkClick}>
                            Arts and Humanity
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/desain" onClick={handleNavLinkClick}>
                            Biological Science
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/sistem" onClick={handleNavLinkClick}>
                            Business
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/iot" onClick={handleNavLinkClick}>
                            Chemistry
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/robotik" onClick={handleNavLinkClick}>
                            Computer Science
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/learn/nilai" onClick={handleNavLinkClick}>
                            Data Science
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                            Earth and Planetary Science
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                            Economic and Finance
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                            Energy
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                            Engineering
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                            Materials Science
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                            Enviromental Science
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                            Health and Medical Science
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                            Psycology
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/faq/learn" onClick={handleNavLinkClick}>
                            Social Science
                        </Link>
                    </div>
                </div>

        </AnimationWrapper>
    )
}

export default CenterCase;