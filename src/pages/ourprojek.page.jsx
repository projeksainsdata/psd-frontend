import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import projectplan from"../imgs/projectplan2.gif";
import ardikasatria from "../imgs/ardikasatria.jpg"

const OurProjek = () => {
    const filters = ['Machine Learning', 'Python', 'Deep Learning', 'Computer Vision', 'Natural Language Processing'];
    const [selectedFilter, setSelectedFilter] = useState('Machine Learning');
    const [projek, setProjek] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortType, setSortType] = useState('name'); // Default sort by name


    const handleNavLinkClick = (e) => {
        if (!isUserLoggedIn()) {
            e.preventDefault();
            navigate('/signin');
        } else {
            setPageState(e.target.innerText);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/${selectedFilter}.json`);
            const data = await response.json();
            setProjek(data);
        };

        fetchData();
    }, [selectedFilter]);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.trim());
        setCurrentPage(1);
    };

    const handleSort = (type) => {
        setSortType(type);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const filterProjek = () => {
        if (!projek) return [];
        let filteredData = projek;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredData = projek.filter(item => {
                const name = item.name ? item.name.toLowerCase() : '';
                const description = item.description ? item.description.toLowerCase() : '';
                return name.includes(query) || description.includes(query);
            });
        }
        // Sorting
        filteredData.sort((a, b) => {
            if (sortType === 'name') {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) return sortDirection === 'asc' ? -1 : 1;
                if (nameA > nameB) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            } else if (sortType === 'id') {
                return sortDirection === 'asc' ? a.ID - b.ID : b.ID - a.ID;
            }
        });
        return filteredData;
    };

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filterProjek().length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = currentPage * itemsPerPage;

    return (
        <AnimationWrapper>
            <section>
            <div className='flex flex-col lg:flex-row gap-6 p-5 ml-30 px-3 max-w-6xl mx-auto'>
                <div className='lg:w-1/2 w-auto'>
                    <img src={projectplan} alt="project" className="max-w-[500px] max-h-[500px]" />
                </div>
                <div className='lg:w-1/2 w-auto'>
                    <h1 className="text-3xl font-bold">Projek Sains Data Repository</h1>
                    <div className="mt-3">
                        <p className="mt-3"> Version 1.0 - Last Updated February 2024 </p>
                        <div className="mt-3 flex gap-2">
                                <p className="font-bold text-xl">Contributor : </p>
                                <img src={ardikasatria} className="w-6 h-6 rounded-full" />
                                <a href="https://projeksainsdata.com/user/ardika.satria">
                                    <p className="line-clamp-1">Ardika Satria</p>
                                </a>
                        </div>
                    </div>
                    <p className="text-gray-500 mt-3 mb-3">
                        Temukan koleksi proyek, kode, dan sumber data. Akses berbagai skrip untuk mendukung penelitian dan pengembangan Anda.
                    </p>
                    <Link className="text-xl flex items-center text-light-green gap-2 mx-auto mb-5 py-2" to="/repository/2" onClick={handleNavLinkClick}>
                            <i className="fi fi-sr-folder-open text-light-green text-xl " />
                            Coming Soon Version 2.0
                    </Link>
                </div>
            </div>
            </section>
            <div className="container mx-auto max-w-6xl">
                <div className=" mb-3 flex flex-wrap gap-3">
                    {filters.map((filter, index) => (
                        <button 
                            key={index} 
                            className={"flex btn " + (selectedFilter === filter ? "btn-dark" : "btn-light")}
                            onClick={() => handleFilterChange(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                
                <div>
                    <h2 className="mb-5">{selectedFilter}</h2>
                    <div className="text-left">
                    <p className="mb-2"> Klik Kolom ID untuk urutan projek paling baru</p>
                    <input 
                        type="text" 
                        placeholder="Cari Projek..." 
                        value={searchQuery} 
                        onChange={handleSearch} 
                        className="search-input bg-grey text-black mb-3"
                    />
    
                    </div>
                    <table className="table-transparent">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>ID</th>
                                <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Name (Link GoogleColab)</th>
                                <th>Description</th>
                                <th>Download Data</th> {/* Kolom baru untuk download data */}
                            </tr>
                        </thead>
                        <tbody>
                            {filterProjek().slice(startIdx, endIdx).map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ID}</td>
                                    <td><a href={item.link} target="_blank" rel="noopener noreferrer" className="text-md text-light-green font-bold">{item.name} </a></td>
                                    <td className="text-left">{item.description}</td>
                                    <td>
                                        {item.dataUrl ? ( // Cek apakah ada URL data
                                            <a href={item.dataUrl} target="_blank" rel="noopener noreferrer" className="text-xl text-light-blue">
                                                <i className="fi fi-rr-file-download text-2xl text-twitter" aria-hidden="true" />
                                            </a>
                                        ) : (
                                            'No Data' // Tampilkan 'No Data' jika tidak ada URL
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    {totalPages > 1 && (
                        <div>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button 
                                    key={index} 
                                    className={currentPage === index + 1 ? 'btn btn-dark mx-1 mt-5' : 'btn btn-light mx-1 mt-5'}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </div>

        </AnimationWrapper>
    );
};

export default OurProjek;
