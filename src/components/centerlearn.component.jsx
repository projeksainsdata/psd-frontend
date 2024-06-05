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
                        <Link className="btn-dark gap-5 mb-6 py-2" to="/learn/dasar" onClick={handleNavLinkClick}>
                            Start Learning Now
                        </Link>
                    </div>
    
                    <div className='lg:w-1/2 w-auto'>
                        <div className='banner-img position-relative w-auto'>
                         <img src={psdlearn} alt="PSD-Learn" className="img-fluid" />
                        </div>
                    </div>
                </div>
        </AnimationWrapper>
    )
}

export default CenterLearn;