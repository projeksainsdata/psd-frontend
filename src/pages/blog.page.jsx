import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
import BlogPostCard from "../components/blog-post.component";
import BlogContent from "../components/blog-content.component";
import CommentsContainer, { fetchComments } from "../components/comments.component";

export const blogStructure = {
    title: '',
    des: '',
    content: [],
    author: { personal_info: { } },
    banner: '',
    publishedAt: '',
}

export const BlogContext = createContext({ });

const BlogPage = () => {
    let { blog_id } = useParams();

    const [blog, setBlog] = useState(blogStructure);
    const [similarBlogs, setSimilarBlogs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [islikedByUser, setLikedByUser] = useState(false);
    const [issavedByUser, setSavedByUser] = useState(false);
    const [commentsWrapper, setCommentsWrapper] = useState(false);
    const [totalParentCommentsLoaded, setTotalParentCommentsLoaded] = useState(0);

    let {
        title,
        content,
        banner,
        author: {
            personal_info: { fullname, username: author_username, profile_img },
        },
        publishedAt,
    } = blog;

    const fetchBlog = () => {
        setLoading(true); // Set loading state to true before fetching blog
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
            .then(async ({ data: { blog } }) => {
                blog.comments = await fetchComments({
                    blog_id: blog._id,
                    setParentCommentCountFun: setTotalParentCommentsLoaded,
                });
                setBlog(blog);

                axios
                    .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
                        tag: blog.tags[0],
                        limit: 6,
                        eliminate_blog: blog_id,
                    })
                    .then(({ data }) => {
                        setSimilarBlogs(data.blogs);
                    });

                setLoading(false); // Set loading state to false after fetching blog
            })
            .catch((err) => {
                console.log(err);
                setLoading(false); // Set loading state to false if there is an error
            });
    };

    useEffect(() => {
        resetStates();
        fetchBlog();
    }, [blog_id]);

    const resetStates = () => {
        setBlog(blogStructure);
        setSimilarBlogs(null);
        setLoading(true);
        setLikedByUser(false);
        setCommentsWrapper(false);
        setTotalParentCommentsLoaded(0);
        setSavedByUser(false);
    };

    return (
        <AnimationWrapper>
            {loading ? (
                <Loader />
            ) : (
                <BlogContext.Provider
                    value={{
                        blog,
                        setBlog,
                        islikedByUser,
                        setLikedByUser,
                        issavedByUser,
                        setSavedByUser,
                        commentsWrapper,
                        setCommentsWrapper,
                        totalParentCommentsLoaded,
                        setTotalParentCommentsLoaded,
                    }}
                >
                    <CommentsContainer />
                    <div className="max-w-[900px] center py-6 max-lg:px-[2vw]">
                        <img src={banner} className="rounded-lg object-cover" />
                        <div className="mt-12">
                            <h2>{title}</h2>
                            <div className="flex max-sm:flex-col justify-between my-8">
                                <div className="flex gap-5 items-start">
                                    <img src={profile_img} className="w-12 h-12 rounded-full" />
                                    <p className="capitalize">
                                        {fullname}
                                        <br />
                                        @<Link to={`/user/${author_username}`} className="underline">{author_username}</Link>
                                    </p>
                                </div>
                                <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">Published on {getDay(publishedAt)}</p>
                            </div>
                        </div>
                        <BlogInteraction />
                        <div className="my-6 font-linearsans blog-page-content max-w-[650px] center py-3 max-lg:px-[2vw]">
                            {content[0].blocks.map((block, i) => (
                                <div key={i} className="my-4 md:my-6 text-xl">
                                    <BlogContent block={block} />
                                </div>
                            ))}
                        </div>
                        <BlogInteraction />
                        {similarBlogs != null && similarBlogs.length ? (
                            <div className="my-6 max-w-[650px] center py-3 max-lg:px-[2vw]">
                                <h1 className="text-2xl mt-6 mb-8 font-linearsans">Baca Juga Artikel yang Sama</h1>
                                {similarBlogs.map((blog, i) => (
                                    <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.08 }}>
                                        <BlogPostCard content={blog} author={blog.author.personal_info} />
                                    </AnimationWrapper>
                                ))}
                            </div>
                        ) : (
                            " "
                        )}
                    </div>
                </BlogContext.Provider>
            )}
        </AnimationWrapper>
    );
};

export default BlogPage;
