/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const MinimalBlogPost = ({ blog, index }) => {
    
    let { title, blog_id: id, author: { personal_info: { fullname, username, profile_img } }, publishedAt } = blog;

    // Function to capitalize each word in fullname
    const capitalizeFullname = (name) => {
        return name.replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
            <h1 className="blog-index text-light-green">{ index < 10 ? "0" + (index + 1) : index === 7 ? "07" : index}</h1>

            <div>
                <div className="flex gap-2 items-center mb-2">
                    <img src={profile_img} className="w-6 h-6 rounded-full" />
                    <p className="line-clamp-1 text-gray-500">{capitalizeFullname(fullname)}</p>
                </div>

                <h1 className="blog-trending ">{title}</h1>
            </div>
        </Link>
    )
}

export default MinimalBlogPost;