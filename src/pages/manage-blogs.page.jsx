import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { filterPaginationData } from "../common/filter-pagination-data";
import { Toaster } from "react-hot-toast";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import NoDataMessage from "../components/nodata.component";
import AnimationWrapper from "../common/page-animation";
import { ManageDraftBlogPost, ManagePublishedBlogCard } from "../components/manage-blogcard.component";
import LoadMoreDataBtn from "../components/load-more.component";
import { useSearchParams } from "react-router-dom";

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState(null);
    const [drafts, setDrafts] = useState(null);
    const [query, setQuery] = useState("");

    let activeTab = useSearchParams()[0].get("tab");

    let { userAuth: { access_token } } = useContext(UserContext);

    const getBlogs = ({ page, draft, deletedDocCount = 0 }) => {
        axios
            .post(
                import.meta.env.VITE_SERVER_DOMAIN + "/user-written-blogs",
                { page, draft, query, deletedDocCount },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then(async ({ data }) => {
                let formatedData = await filterPaginationData({
                    state: draft ? drafts : blogs,
                    data: data.blogs,
                    page,
                    user: access_token,
                    countRoute: "/user-written-blogs-count",
                    data_to_send: { draft, query },
                });

                // Log hasil data untuk debugging
                console.log(`Formatted Data (${draft ? "Drafts" : "Blogs"}):`, formatedData);

                if (draft) {
                    setDrafts({
                        ...formatedData,
                        totalDocs: data.totalDocs || formatedData.results.length, // Tambahkan totalDocs
                    });
                } else {
                    setBlogs({
                        ...formatedData,
                        totalDocs: data.totalDocs || formatedData.results.length, // Tambahkan totalDocs
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (access_token) {
            if (blogs == null) {
                console.log("Fetching Published Blogs...");
                getBlogs({ page: 1, draft: false });
            }
            if (drafts == null) {
                console.log("Fetching Draft Blogs...");
                getBlogs({ page: 1, draft: true });
            }
        }
    }, [access_token, blogs, drafts, query]);

    const handleSearch = (e) => {
        let searchQuery = e.target.value;

        setQuery(searchQuery);

        if (e.keyCode === 13 && searchQuery.length) {
            setBlogs(null);
            setDrafts(null);
        }
    };

    const handleChange = (e) => {
        if (!e.target.value.length) {
            setQuery("");
            setBlogs(null);
            setDrafts(null);
        }
    };

    return (
        <>
            <h1 className="max-md:hidden">Manage Blogs</h1>

            <Toaster />

            <div className="relative max-md:mt-5 md:mt-8 mb-10">
                <input
                    type="search"
                    className="w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey"
                    placeholder="Search Blogs"
                    onChange={handleChange}
                    onKeyDown={handleSearch}
                />

                <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
            </div>

            <InPageNavigation routes={["Published Blogs", "Drafts"]} defaultActiveIndex={activeTab !== "draft" ? 0 : 1}>
                {
                    // Published Blogs
                    blogs == null ? (
                        <Loader />
                    ) : blogs.results.length ? (
                        <>
                            <div className="mb-4">Published Blogs ({blogs?.totalDocs || 0} Blog)</div>
                            {blogs.results.map((blog, i) => {
                                return (
                                    <AnimationWrapper key={i} transition={{ delay: i * 0.04 }}>
                                        <ManagePublishedBlogCard blog={{ ...blog, index: i, setStateFunc: setBlogs }} />
                                    </AnimationWrapper>
                                );
                            })}

                            <LoadMoreDataBtn
                                state={blogs}
                                fetchDataFun={getBlogs}
                                additionalParam={{ draft: false, deletedDocCount: blogs.deletedDocCount }}
                            />
                        </>
                    ) : (
                        <NoDataMessage message="No published blogs" />
                    )
                }

                {
                    // Draft Blogs
                    drafts == null ? (
                        <Loader />
                    ) : drafts.results.length ? (
                        <>
                            <div className="mb-4">Draft Blogs ({drafts?.totalDocs || 0} Draft)</div>
                            {drafts.results.map((blog, i) => {
                                return (
                                    <AnimationWrapper key={i} transition={{ delay: i * 0.04 }}>
                                        <ManageDraftBlogPost blog={{ ...blog, index: i, setStateFunc: setDrafts }} />
                                    </AnimationWrapper>
                                );
                            })}

                            <LoadMoreDataBtn
                                state={drafts}
                                fetchDataFun={getBlogs}
                                additionalParam={{ draft: true, deletedDocCount: drafts.deletedDocCount }}
                            />
                        </>
                    ) : (
                        <NoDataMessage message="No draft blogs" />
                    )
                }
            </InPageNavigation>
        </>
    );
};

export default ManageBlogs;
