import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import { activeTabRef } from "../components/inpage-navigation.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import ban from "../imgs/hero2.png";
import band from "../imgs/dpsd.jpg"
import React from 'react'
import { FaDiscord } from 'react-icons/fa'

const HomePage = () => {
    let [blogs, setBlog] = useState(null);
    let [trendingBlogs, setTrendingBlog] = useState(null);
    let [ pageState, setPageState ] = useState("beranda");

    let categories = [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "Time Series",
        "Cloud Computing",
        "Sains",
        "Data",
        "Artificial Intelligence",
        "Natural Language Processing",
    ];

    const fetchLatestBlogs = ({ page = 1 }) => {
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
            .then( async ({ data }) => {

                let formatedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/all-latest-blogs-count"
                })

                setBlog(formatedData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchBlogsByCategory = ({ page = 1 }) => {
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: pageState, page })
            .then( async ({ data }) => {
                
                let formatedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/search-blogs-count",
                    data_to_send: { tag: pageState }
                })

                setBlog(formatedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const fetchTrendingBlogs = () => {
        axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
            .then(({ data }) => {
                setTrendingBlog(data.blogs);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadBlogByCategory = (e) => {
        
        let category = e.target.innerText.toLowerCase(); 

        setBlog(null);

        if(pageState == category){
            setPageState("beranda");
            return;
        }

        setPageState(category);

    }

    useEffect(() => {

        activeTabRef.current.click();

        if(pageState == "beranda"){
            fetchLatestBlogs({ page: 1 });
        } else {
            fetchBlogsByCategory({ page: 1 })
        }

        if(!trendingBlogs){
            fetchTrendingBlogs();
        }

    }, [pageState]);

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
            <section>
            <div className='flex flex-col mb-0 lg:flex-row gap-6 p-5 ml-30 px-3 max-w-6xl mx-auto'>
                <div className='lg:w-1/2'>
                    <span className="text-xl font-bold">Welcome to Projek Sains Data</span>
                    <p className="mt-5 items-center"></p>
                    <Link className="text-base text-light-green gap-10 mx-auto mb-5 py-2" to="/projek-kami" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-workflow-alt mr-2 text-light-green " />
                            Lihat Kumpulan Proyek Sains Data Terkini PSD
                    </Link>
                    <p className=" items-center"></p>

                    <p className='text-gray-500 mt-5 mb-5 text-base'>
                        Di sini, kalian akan menemukan beragam artikel dan tutorial menarik yang membahas topik-topik 
                        seperti Sains Data, Rekayasa Data, Big Data, Analisis Data, Kecerdasan Buatan, Sains, hingga 
                        Teknologi Data dan Komputasi.
                    </p>
                    <Link className="text-base btn-light bg-grey rounded-full gap-5 mb-6 py-2" to="/ai/tanya-psd" onClick={handleNavLinkClick}>
                        Ada Pertanyaan? Ayo ngobrol dengan PSD-GPT!
                    </Link>
                    {/* <Link className="gap-10 mx-auto mb-5 py-2" to="/center/learn" onClick={handleNavLinkClick}>
                        <h1 className="font-medium text-xl mt-7 mb-5 flex items-center gap-3 text-light-green">
                            <i className="fi fi-rr-user-robot"></i>
                            <span>Try out our new technology integrated with artificial intelligence for your projects in the industry</span>
                        </h1>
                    </Link> */}
                </div>

                <div className='lg:w-1/2 justify-center items-center'>
                    <div className=' banner-content position-relative w-auto'>
                        <img src={band} alt="DPSD" className="banner-content w-11/12 h-1/2 object-cover rounded-3xl shadow-2xl img-fluid" />
                    </div>
                    {/* <div className='relative'>
                        <img src={ban} alt="PSD" className="w-11/12 h-11/12 object-cover" />
                    </div> */}
                </div>

            </div>
            </section>

            {/* <section className="rounded-xl flex p-2 items-center justify-between mb-3">
            <div className='flex flex-col lg:flex-row gap-6 p-3 ml-30 px-3 max-w-6xl mx-auto'>
                <div className='lg:w-1/2 w-auto'>
                        <div className=' banner-content position-relative w-auto'>
                        <img src={band} alt="DPSD" className="banner-content rounded-3xl shadow-2xl img-fluid" />
                        </div>
                </div>
                <div className='lg:w-1/2 items-center'>
                    <div className="banner mt-3 rounded-xl bg-grey text-white p-4 items-center justify-between">
                        <div className="banner-content flex items-center">
                        <FaDiscord className="text-discord text-4xl mr-4" />
                            <div>
                                <p className="text-light-green text-xl font-bold">Join to Our Community</p>
                                <h3 className="font-bold text-light-green">Diskusi Projek Sains Data</h3>
                            </div>
                        </div>
                            <a
                            href="https://discord.gg/9NwY3DXU"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex bg-white mt-3 items-center justify-center text-light-green px-4 py-2 rounded-full shadow-md hover:bg-black/10 transition duration-300"
                            >
                        Join Now
                        </a>
                    </div>
                </div>
            </div>
            </section> */}
            <section className="mx-auto">
            <div className="flex flex-col gap-10 justify-center">
                <div>
                    <h1 className="font-medium text-xl mb-8 flex items-center gap-3 text-twitter">
                        <i className="fi fi-rr-star"></i>
                        <span>Eksplor Topik Terbaru Hari ini </span>
                    </h1>

                    <div className="flex gap-3 flex-wrap">
                        {categories.map((category, i) => {
                            return (
                                <button onClick={loadBlogByCategory} className={"tag " + (pageState == category ? " bg-black text-white " : " ")} 
                                key={i}>
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            </section>


            
            <section className="h-cover flex justify-center gap-10">



                {/* latest blogs */}

                <div className="w-full">
                    <InPageNavigation
                        routes={[ pageState , "trending blogs"]}
                        defaultHidden={["trending blogs"]}
                    >
                        <>
                            {blogs == null ? (
                                <Loader />
                            ) : (
                                blogs.results.length ? 
                                    blogs.results.map((blog, i) => {
                                        return (
                                            <AnimationWrapper
                                                transition={{
                                                    duration: 1,
                                                    delay: i * 0.1,
                                                }}
                                                key={i}
                                            >
                                                <BlogPostCard
                                                    content={blog}
                                                    author={
                                                        blog.author.personal_info
                                                    }
                                                />
                                            </AnimationWrapper>
                                        );
                                    })
                                : <NoDataMessage message="No blogs published" />
                            )}
                            <LoadMoreDataBtn state={blogs} fetchDataFun={( pageState == "beranda" ? fetchLatestBlogs : fetchBlogsByCategory )} />
                        </>

                        {trendingBlogs == null ? (
                            <Loader />
                        ) : (
                            trendingBlogs.length ?
                                trendingBlogs.map((blog, i) => {
                                    return (
                                        <AnimationWrapper
                                            transition={{
                                                duration: 1,
                                                delay: i * 0.1,
                                            }}
                                            key={i}
                                        >
                                            <MinimalBlogPost
                                                blog={blog}
                                                index={i}
                                            />
                                        </AnimationWrapper>
                                    );
                                })
                            : <NoDataMessage message="No trending blogs" />
                        )}


                    </InPageNavigation>
                </div>




                {/* filters and trending blogs */}
                <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
 

                        <div>
                            <h1 className="font-bold text-xl mb-8 text-light-green">
                                 <i className="fi fi-rs-rocket-lunch"></i> Trending
                            </h1>

                            {trendingBlogs == null ? (
                                <Loader />
                            ) : (
                                trendingBlogs.length ? 
                                    trendingBlogs.map((blog, i) => {
                                        return (
                                            <AnimationWrapper
                                                transition={{
                                                    duration: 1,
                                                    delay: i * 0.1,
                                                }}
                                                key={i}
                                            >
                                                <MinimalBlogPost
                                                    blog={blog}
                                                    index={i}
                                                />
                                            </AnimationWrapper>
                                        );
                                    })
                                : <NoDataMessage message="No trending blogs" />
                            )}
                        </div>
                    </div>
            </section>
            
        </AnimationWrapper>
    );
};

export default HomePage;