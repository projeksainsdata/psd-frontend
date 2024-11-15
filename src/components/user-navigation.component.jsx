import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {

    const { userAuth: { username }, setUserAuth } = useContext(UserContext);

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({ access_token: null })
    }

    return (
        <AnimationWrapper 
            className="absolute right-0 z-50"
            transition={{ duration: 0.2 }}
        >

            <div className="bg-white abosolute right-0 border border-grey w-60 duration-200">

                
                <Link to="/editor" className="flex md:hidden gap-2 link pl-8 py-4">
                    <i className="fi fi-br-pen-field"></i>
                    <strong>Tulis</strong>
                </Link> 
                
                <Link to="/projek-kami" className="flex gap-2 link md:hidden pl-8 py-4">
                    <i className="fi fi-rr-workflow-alt"></i>
                    <strong>Projek</strong>
                </Link>

                <Link to="/ai/tanya-psd" className="flex gap-2 link md:hidden pl-8 py-4">
                    <i className="fi fi-rr-star"></i>
                    <strong>AI Center</strong>
                </Link>

                <Link to="/learn/dasar" className="flex gap-2 link md:hidden pl-8 py-4">
                    <i className="fi fi-rr-books"></i>
                    <strong>PSD-Learn</strong>
                </Link>

                <Link to={`/user/${username}`} className="link pl-8 py-4">
                    Profile
                </Link>

                <Link to="/dashboard/blogs" className="link pl-8 py-4">
                    Dashboard
                </Link>

                <Link to="/dashboard/bookmark" className="link pl-8 py-4">
                    Bookmarks
                </Link>
                
                <Link to="/settings/edit-profile" className="link pl-8 py-4">
                    Settings
                </Link>
                

                <span className="absolute border-t border-grey w-[100%]"></span>

                <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
                    onClick={signOutUser}
                >
                    <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                    <p className="text-dark-grey">@{username}</p>
                </button>

            </div>

        </AnimationWrapper>
    )

}

export default UserNavigationPanel;