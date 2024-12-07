import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { Toaster } from 'react-hot-toast';
import Loader from '../components/loader.component';
import NoDataMessage from '../components/nodata.component';
import AnimationWrapper from '../common/page-animation';
import { debounce } from 'lodash';
import MemberCard from './membercard.component';

const MembersPage = () => {
    const [members, setMembers] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalMembers, setTotalMembers] = useState(0);
    const itemsPerPage = 12;

    const { userAuth } = useContext(UserContext);

    const fetchMembers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_DOMAIN}/search-members`,
                { query, page: currentPage, limit: itemsPerPage },
                {
                    headers: {
                        Authorization: `Bearer ${userAuth.access_token}`,
                    },
                }
            );
            setMembers(response.data.users);
            setTotalMembers(response.data.totalCount);
        } catch (error) {
            console.error('Error fetching members:', error);
            setError('Failed to fetch members. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [userAuth, query, currentPage]);

    useEffect(() => {
        if (userAuth.access_token) {
            fetchMembers();
        }
    }, [userAuth, query, currentPage, fetchMembers]);

    const handleSearch = useCallback(
        debounce((e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
        }, 300),
        []
    );

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handlePageChange = (e) => {
        setCurrentPage(parseInt(e.target.value, 10));
    };

    const totalPages = Math.ceil(totalMembers / itemsPerPage);

    const sortedMembers = [...members].sort((a, b) => {
        if (sortOption === 'alphabetical') {
            return a.personal_info.username.localeCompare(b.personal_info.username);
        }
        return new Date(b.joinedAt) - new Date(a.joinedAt);
    });

    return (
        <AnimationWrapper>
            <div>
                <div className="container mx-auto px-4">
                    <Toaster />

                    {/* Header Section */}
                    <div className="flex justify-between items-center my-4">
                        {/* Filter and Pagination (Left Section) */}
                        <div className="flex items-center gap-4">
                            <select
                                value={sortOption}
                                onChange={handleSortChange}
                                className="bg-grey p-2 rounded-md"
                            >
                                <option value="newest">Newest First</option>
                                <option value="alphabetical">A-Z</option>
                            </select>
                            <div className="flex items-center">
                                <label htmlFor="page-select" className="mr-2 text-lg">
                                    Page:
                                </label>
                                <select
                                    id="page-select"
                                    value={currentPage}
                                    onChange={handlePageChange}
                                    className="bg-grey p-2 rounded-md"
                                >
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Member Count (Right Section) */}
                        <div className="flex items-center">
                            <h1 className="text-2xl font-semibold">Member</h1>
                            <div className="ml-4 bg-light-green text-white text-xl px-4 py-2 rounded-full">
                                Total: {totalMembers}
                            </div>
                        </div>
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        className="w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey"
                        placeholder="Search members"
                        onChange={handleSearch}
                    />
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <NoDataMessage message={error} />
                    ) : (
                        sortedMembers.map((member, index) => (
                            <AnimationWrapper key={index} transition={{ delay: index * 0.1 }}>
                                <Link to={`/user/${member.personal_info.username}`}>
                                    <MemberCard member={member} />
                                </Link>
                            </AnimationWrapper>
                        ))
                    )}
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default MembersPage;
