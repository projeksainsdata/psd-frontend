import { useContext, useEffect, useRef, useState } from "react"
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom"
import { UserContext } from "../App"

const SideLearn = () => {
    let navigate = useNavigate(); // Pindahkan useNavigate ke dalam komponen SideNav

    let { userAuth: { access_token, new_notification_available } } = useContext(UserContext)

    let page = location.pathname.split("/")[2];

    let [ pageState, setPageState ] = useState(page.replace('-', ' '));
    let [ showSideNav, setShowSideNav ] = useState(false);

    let activeTabLine = useRef();
    let sideBarIconTab = useRef();
    let pageStateTab = useRef();

    const changePageState = (e) => {

        let { offsetWidth, offsetLeft } = e.target;

        activeTabLine.current.style.width = offsetWidth + "px";
        activeTabLine.current.style.left = offsetLeft + "px";

        if(e.target == sideBarIconTab.current){
            setShowSideNav(true);
        } else{
            setShowSideNav(false);
        }

    }



    useEffect(() => {
        setShowSideNav(false);
        pageStateTab.current.click();
    }, [pageState])

    return (
        <>
            <section className="relative flex gap-10 py-0 m-0 max-md:flex-col">

            <div className="sticky top-[80px] z-30"> 

                <div className="md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto ">
                    <button ref={sideBarIconTab} className="p-5 capitalize" onClick={changePageState}>
                        <i className="fi fi-rr-bars-staggered pointer-events-none"></i>
                    </button>
                    <button ref={pageStateTab} className="p-5 capitalize" onClick={changePageState}>
                        { pageState }
                    </button>
                    <hr ref={activeTabLine} className="absolute bottom-0 duration-500" />
                </div>

                    <div className={"min-w-[200px] h-[calc(100vh-80px-60px)] md:h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute max-md:top-[64px] bg-white max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500 " + (!showSideNav ? "max-md:opacity-0 max-md:pointer-events-none" : "opacity-100 pointer-events-auto")}>
                        <h1 className="text-xl font-bold text-dark-grey mb-3">PSD-Learn</h1>
                        <hr className="border-grey -ml-6 mb-8 mr-6" />


                        <NavLink to="/learn/dasar" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-learn">
                            <i className="fi fi-rr-calculator-simple text-xl"></i> Dasar
                        </NavLink>

                        <NavLink to="/learn/analitik" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-learn">
                            <i className="fi fi-rr-square-poll-vertical text-xl"></i> Analitik
                        </NavLink>

                        <NavLink to="/learn/desain" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-learn">
                            <i className="fi fi-rr-microchip text-xl"></i> Desain
                        </NavLink>

                        <NavLink to="/learn/sistem" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-learn">
                            <i className="fi fi-rr-database text-xl"></i> Sistem
                        </NavLink>

                        <NavLink to="/learn/iot" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-learn">
                            <i className="fi fi-rr-sensor-on text-xl"></i> IoT
                        </NavLink>

                        <NavLink to="/learn/robotik" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-learn">
                            <i className="fi fi-rr-robot text-xl"></i> Robotik
                        </NavLink>
                        
                        <NavLink to="/learn/nilai" onClick={(e) => setPageState(e.target.innerText)} className="sidebar-learn">
                            <i className="fi fi-rr-unlock text-xl"></i> Nilai
                        </NavLink>
                    </div>
                </div>

                <div className="max-md:-mt-8 mt-5 w-full">
                    <Outlet />
                </div>
            </section>
        </>
    )
}

export default SideLearn