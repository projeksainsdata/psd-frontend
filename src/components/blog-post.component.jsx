import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    let { publishedAt, title, des, banner, activity: { total_likes, total_comments }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;

    // Function to capitalize each word in fullname
    const capitalizeFullname = (name) => {
        return name.replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <Link to={`/blog/${id}`} className="flex gap-8 overflow border-b border-grey pb-5 mb-4">
            <div className="w-full">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <img src={profile_img} className="w-6 h-6 rounded-full" />
                        <p className="line-clamp-1">{capitalizeFullname(fullname)}</p>
                    </div>
                    <p className="min-w-fit text-gray-500">{getDay(publishedAt)}</p>
                </div>
                
                <div className="flex">
                    <div className="w-1/6 h-10 mt-5 items-center">
                        <div className="relative w-full h-0 pb-[100%]"> {/* This creates a square container */}
                            <img src={banner} className="absolute top-0 left-0 w-full h-full rounded-lg object-cover opacity-50 hover:opacity-100" />
                        </div>
                    </div>
                    <div className="w-4/5 p-4">
                        <h1 className="blog-title font-bold">{title}</h1>
                        <p className="my-3 text-base font-linearsans leading-7 md:max-[1100px]:hidden line-clamp-2">{des}</p>
                        <div className="flex gap-4 items-center">
                            <span className="flex items-center gap-2 text-xl text-black">
                                <i className="fi fi-ss-rocket-lunch text-dark-grey"></i>
                                {total_likes}
                            </span>
                            <span className="flex items-center gap-2 text-xl text-black">
                                <i className="fi fi-ss-comment-dots text-dark-grey"></i>
                                {total_comments}
                            </span>
                        </div>
                    </div>
                    
                </div>

            </div>
        </Link>
    );
}

export default BlogPostCard;
