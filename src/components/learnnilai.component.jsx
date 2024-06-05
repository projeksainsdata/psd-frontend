import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/loader.component';
import NoDataMessage from '../components/nodata.component';
import { Toaster } from 'react-hot-toast';
import nilai from "../imgs/Protection.gif";

const LearnNilai = () => {
  const [articles, setArticles] = useState({});
  const [query, setQuery] = useState('');
  const [activeLetter, setActiveLetter] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/articles.json');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching the articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleToggle = (letter) => {
    setActiveLetter(activeLetter === letter ? null : letter);
  };

  const handleSearch = (e) => {
    let searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);
  };

  const filteredArticles = Object.keys(articles).reduce((acc, letter) => {
    acc[letter] = articles[letter].filter(article =>
      article.title.toLowerCase().includes(query)
    );
    return acc;
  }, {});

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <>
        <div className='flex flex-col lg:flex-row gap-6 p-5 ml-30 px-3 max-w-6xl mx-auto'>
          <div className='lg:w-1/2'>
              <h1 className='text-3xl font-bold lg:text-6xl'>
                  Nilai (Values)
              </h1>
              <p className="mt-5 items-center"></p>

              <p className='text-gray-500 mt-5 mb-5 text-xl'>
                  Here you'll find a variety of articles and tutorials on topics such as Data Science,
                  Data Engineering, Big Data, Data Analysis, Artificial Intelligence, Science, and
                  Technology Data and Computing.
              </p>
          </div>

          <div className='lg:w-1/2 w-auto'>
              <div className='banner-img position-relative w-auto'>
              <img src={nilai} alt="nilai" className="img-fluid" />
              </div>
          </div>
    </div>
      <div className="container mx-auto px-4">
        <Toaster />
        <div className="flex items-center my-4">
          <h1 className="text-2xl font-semibold justify-left">Learn-Nilai</h1>
          <div className="ml-4 bg-light-green text-white text-xl px-4 py-2 rounded-full">
            Total: {Object.values(filteredArticles).reduce((acc, articles) => acc + articles.length, 0)}
          </div>
          <div className="ml-auto relative">
            <button
              className="bg-grey p-4 rounded-full flex items-center justify-between w-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>Select Letter</span>
              <FontAwesomeIcon icon={dropdownOpen ? faChevronUp : faChevronDown} />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu absolute bg-white w-full mt-2 rounded-md shadow-lg z-10">
                {alphabet.map(letter => (
                  <div
                    key={letter}
                    className="dropdown-item p-2 cursor-pointer hover:bg-grey"
                    onClick={() => {
                      handleToggle(letter);
                      setDropdownOpen(false);
                    }}
                  >
                    {letter} ({filteredArticles[letter]?.length || 0})
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <input
          type="text"
          className="w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey"
          placeholder="Pilih dahulu select letter sebelum mencari artikel"
          onChange={handleSearch}
        />
      </div>

      {activeLetter && (
        <div className="letter-section container mx-auto px-4">
          <div className="letter-header flex p-4">
            <h2 className='text-light-green'>{activeLetter}</h2>
            <h1 className='font-bold text-xl'>Jumlah Artikel :{filteredArticles[activeLetter]?.length || 0}</h1>
          </div>
          <hr className="border-pink -ml-6 mb-4 mr-6" />
          {filteredArticles[activeLetter] == null ? (
            <Loader />
          ) : filteredArticles[activeLetter].length ? (
            filteredArticles[activeLetter].map((article, index) => (
              <div key={index} className="article-item text-left">
                <h3>{article.title}</h3>
                <p>{article.content}</p>
                <hr className="border-pink -ml-6 mb-4 mr-6 mt-2" />
              </div>
              
            ))
          ) : (
            <NoDataMessage message={`No articles found for ${activeLetter}`} />
          )}
        </div>
      )}
    </>
  );
};

export default LearnNilai;
