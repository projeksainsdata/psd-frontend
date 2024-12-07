import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../pages/blog.page";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const BlogInteraction = () => {
    let { blog, blog: { _id, title, blog_id, activity, activity: { total_likes, total_comments, total_saved }, author: { personal_info: { username: author_username } }, tags  }, setBlog, islikedByUser, setLikedByUser, setCommentsWrapper, issavedByUser, setSavedByUser } = useContext(BlogContext);

    let { userAuth: { username, access_token } } = useContext(UserContext);

    useEffect(() => {
        if (access_token) {
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/isliked-by-user", { _id }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data: { result } }) => {
                setLikedByUser(Boolean(result));
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, []);

    useEffect(() => {
        if (access_token) {
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/issaved-by-user", { _id }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data: { result } }) => {
                setSavedByUser(Boolean(result));
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, []);
    
    const handleLike = () => {
        if (access_token) {
            setLikedByUser(prevVal => !prevVal);
            !islikedByUser ? total_likes++ : total_likes--;
            setBlog({ ...blog, activity: { ...activity, total_likes } });

            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/like-blog", { _id, islikedByUser }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            toast.error("please login to like this blog");
        }
    }

    const handleBookmark = () => {
        if (access_token) {
            setSavedByUser(prevVal => !prevVal);
            !issavedByUser ? total_saved++ : total_saved--;
            setBlog({ ...blog, activity: { ...activity, total_saved } });

            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/bookmark-blog", { _id, issavedByUser }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            toast.error("please login to bookmark this blog");
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                toast.success("Link copied to clipboard");
            })
            .catch(err => {
                toast.error("Failed to copy link");
                console.error(err);
            });
    };

    const fetchBlogsByCategory = (tag) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag })
            .then(({ data }) => {
                setBlogs(data.blogs);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Toaster />



            <div className="flex items-center justify-between gap-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {tags &&
                    tags.map(tag => (
                        <Link
                            key={tag}
                            to={`/search/${tag}`}
                            className="bg-grey rounded-full px-3 py-1 text-base"
                        >
                            {tag}
                        </Link>
                    ))}
            </div>

            {/* Edit This Post Button */}
            {username === author_username && (
                <Link
                    to={`/editor/${blog_id}`}
                    className="flex items-center gap-2 bg-light-green text-white px-3 py-1 rounded-full"
                >
                    <i className="fi fi-rr-pen-field"></i>
                    <span>Edit This Post</span>
                </Link>
            )}
        </div>

            <hr className="border-grey my-2 mt-8" />
            <div className="flex items-center justify-center mb-6">
                <div className="flex gap-3 items-center">
                    <button
                        onClick={handleLike}
                        className={"w-10 h-10 rounded-full flex items-center justify-center " + (islikedByUser ? "bg-red/20 text-red" : "bg-grey/80")}
                    >
                        <i className={"fi " + (islikedByUser ? "fi fi-bs-rocket-lunch" : "fi fi-rs-rocket-lunch")}></i>
                    </button>
                    <p className="text-xl text-dark-grey">{total_likes} Rocket</p>

                    <button
                        onClick={() => setCommentsWrapper(prevVal => !prevVal)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80"
                    >
                        <i className="fi fi-rr-comment-dots"></i>
                    </button>
                    <p className="text-xl text-dark-grey">{total_comments} Comments</p>
                    <button
                        onClick={handleBookmark}
                        className={"w-10 h-10 rounded-full flex items-center justify-center " + (issavedByUser ? "bg-twitter/20 text-twitter" : "bg-grey/80")}
                    >
                        <i className={"fi " + (issavedByUser ? "fi-sr-bookmark" : "fi-rr-bookmark")}></i>
                    </button>
                    <p className="text-xl text-dark-grey">{total_saved} Saved</p>
                    
                </div>
            </div>





            

            <div className="flex gap-6 items-center justify-center ">
                <p className="text-dark-grey opacity-75 ">Share on</p>
                <Link to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`} target="_blank" rel="noopener noreferrer"><i className="fi fi-brands-twitter text-xl hover:text-twitter"></i></Link>
                <Link to={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(location.href)}&title=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">
                    <i className="fi fi-brands-linkedin text-xl hover:text-linkedin"></i>
                </Link>
                <Link to={`https://wa.me/?text=Read ${encodeURIComponent(title)} ${encodeURIComponent(location.href)}`} target="_blank" rel="noopener noreferrer">
                    <i className="fi fi-brands-whatsapp text-xl hover:text-whatsapp"></i>
                </Link>
                <Link to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`} target="_blank" rel="noopener noreferrer">
                    <i className="fi fi-brands-facebook text-xl hover:text-facebook"></i>
                </Link>
                <Link to={`https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram">
                    <i className="fi fi-brands-telegram text-xl hover:text-telegram" aria-hidden="true"></i>
                </Link>
                <button onClick={handleCopyLink} className="text-base hover:text-grey">
                    <i className="fi fi-rr-link"></i> Link
                </button>
            </div>

            <hr className="border-grey my-2" />
        </>
    );
}

export default BlogInteraction;
