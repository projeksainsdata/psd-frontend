import React from 'react';
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import psdrepo from "../imgs/dashboard-projek.png"

const CenterRepo = () => {
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
                            Welcome to PSD-Repository
                        </h1>
    
                        <p className='text-gray-500 mt-5 mb-5 text-xl'>
                            Here you'll find a variety of articles and tutorials on topics such as Data Science,
                            Data Engineering, Big Data, Data Analysis, Artificial Intelligence, Science, and
                            Technology Data and Computing.
                        </p>
                    </div>
    
                    <div className='lg:w-1/2 w-auto'>
                        <div className='banner-img position-relative w-auto'>
                         <img src={psdrepo} alt="PSD-Repository" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="mb-3 text-center">Our Projects is here</h3>
                    <div className="button-container">
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/projek-kami" onClick={handleNavLinkClick}>
                            <i className='fi fi-sr-share-square' ></i> Go to Projek
                        </Link>
                        <Link className="btn-dark mb-6 py-2 mr-3" to="/center/repository/contributor" onClick={handleNavLinkClick}>
                            <i className='fi fi-sr-user-add'></i> Become Contributor
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

export default CenterRepo;