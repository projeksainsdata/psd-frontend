import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import darkLogo from "../imgs/logo-dark.png";
import lightLogo from "../imgs/logo-light.png";
import { ThemeContext, UserContext } from '../App';
import UserNavigationPanel from "./user-navigation.component";
import axios from "axios";
import { storeInSession } from "../common/session";

const Navbar = () => {

    const [ searchBoxVisibility, setSearchBoxVisibility ] = useState(false)
    const [ userNavPanel, setUserNavPanel ] = useState(false);

    let { theme, setTheme } = useContext(ThemeContext);

    let navigate = useNavigate();

    const { userAuth, userAuth: { access_token, profile_img, new_notification_available }, setUserAuth } = useContext(UserContext);

    useEffect(() => {

        if(access_token){
            axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/new-notification", {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data }) => {
                setUserAuth({ ...userAuth, ...data })
            })
            .catch(err => {
                console.log(err)
            })
        }

    }, [access_token])

    const handleUserNavPanel = () => {
        setUserNavPanel(currentVal => !currentVal);
    }

    const handleSearch = (e) => {
        let query = e.target.value;
        
        if(e.keyCode == 13 && query.length){
            navigate(`/search/${query}`);
        }
    }

    const handleBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false);
        }, 200);
    }

    const changeTheme = () => {
        
        let newTheme = theme == "light" ? "dark" : "light";

        setTheme(newTheme);

        document.body.setAttribute("data-theme", newTheme);

        storeInSession("theme", newTheme);

    }

    const handleNavLinkClick = (e) => {
        if (!isUserLoggedIn()) {
            e.preventDefault();
            navigate('/signin');
        } else {
            setPageState(e.target.innerText);
        }
    };

    return (
        <>
            <nav className="navbar z-50 navbar-dark bg-blur">

                <Link to="/" className="flex-none w-10">
                    <img src={ theme == "light" ? darkLogo : lightLogo } className="w-full" />
                </Link>

                
                <div className={"absolute w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " + ( searchBoxVisibility ? "show" : "hide" )}>
                    <input 
                        type="text"
                        placeholder="Cari..."
                        className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                        onKeyDown={handleSearch}
                    />

                    <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
                </div>

                <div className="flex items-center gap-3 md:gap-2 ml-auto">
                    <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
                    onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}
                    >
                        <i className="fi fi-rr-search text-xl"></i>
                    </button>

                    <Link to="/projek-kami" className="hidden md:flex gap-1 link">
                        <i className="fi fi-rr-workflow-alt"></i>
                        <strong >Projek</strong>
                    </Link>

                    <Link to="/studi-kasus" className="hidden md:flex gap-1 link">
                        <i className="fi fi-rr-key"></i>
                        <strong >Case Study</strong>
                    </Link>

                    <Link to="/learn" className="hidden md:flex gap-1 link">
                        <i className="fi fi-rr-books"></i>
                        <strong >Learn</strong>
                    </Link>

                    <Link to="/dashboard/tanya-psd" className="hidden md:flex gap-1 link" onClick={handleNavLinkClick}>
                        <i className="fi fi-rr-brain-circuit"></i>
                        <strong >PSD-GPT</strong>
                    </Link>

                    <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10" onClick={changeTheme}>
                        <i className={"fi fi-rr-" + ( theme == "light" ?  "bulb" : "brightness" ) + " text-2xl block mt-1 bg-dark" }></i>
                    </button>
                    

                    <Link to="/center" className="flex-none w-10 gap-1">
                    <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                        <i className="fi fi-sr-apps text-2xl block mt-1 bg-dark"></i>
                    </button>
                    </Link>
                    



                    {
                        access_token ? 
                        <>
                            <Link to="/dashboard/notifications">
                                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                                    <i className="fi fi-rs-bell text-2xl block mt-1 bg-dark"></i>
                                    {
                                        new_notification_available ? 
                                        <span className="bg-red w-3 h-3 rounded-full absolute z-10 top-2 right-2"></span> : ""
                                    }
                                    
                                </button>
                            </Link>


                            <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                                <button className="w-12 h-12 mt-1">
                                    <img src={profile_img} className="w-full h-full object-cover rounded-full" />
                                </button>

                                {
                                    userNavPanel ? <UserNavigationPanel /> : ""
                                }

                            </div>
                        </>
                        :
                        <>
                            <Link className="btn-dark py-2" to="/signin">
                            Masuk
                            </Link>
                            <Link className="btn-light py-2 hidden md:block" to="/signup">
                                Daftar
                            </Link>
                        </>
                    }

                </div>

            </nav>

            <Outlet />
        </>
    )
}

export default Navbar;