import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";
import SideNav from "./components/sidenavbar.component";
import ChangePassword from "./pages/change-password.page";
import EditProfile from "./pages/edit-profile.page";
import Notifications from "./pages/notifications.page";
import ManageBlogs from "./pages/manage-blogs.page";
import Footer from "./pages/footer.page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import ChatAI from "./components/chatgpt.component";
import OnlyAdminPrivateRoute from "./components/admin.component";
import MembersPage from "./components/dashuser.component";
import 'katex/dist/katex.min.css';
import OurProjek from "./pages/ourprojek.page";
import TodoList from "./pages/todolist.pages";
import AboutUsPage from "./pages/aboutus.page";
import SideNav2 from "./components/sidenavbar2.component";
import DeleteUserPage from "./components/deleteuser.component";
import ProfilePage3 from "./pages/profile2.page";
import ProfilePage4 from "./pages/profile3.page";
import ForumFrontPage from "./pages/homeforum.page";
import ForumPage from "./pages/homeforum.page";
import BookmarkPage from "./pages/bookmark.page";
import SideLearn from "./components/sidelearn.component";
import SideCenter from "./components/sidecenter.component";
import LearnDasar from "./components/learndasar.component";
import LearnAnalitik from "./components/learnanalitik.component";
import LearnDesain from "./components/learndesain.component";
import LearnSistem from "./components/learnsistem.component";
import LearnIot from "./components/learniot.component";
import LearnRobotik from "./components/learnrobotik.component";
import LearnNilai from "./components/learnnilai.component";
import CenterLearn from "./components/centerlearn.component";
import CenterAI from "./components/centerai.component";
import CenterCase from "./components/centercase.component";
import CenterDT from "./components/centercraft.component";
import CenterConsul from "./components/centerconsul.component";
import CenterChain from "./components/centerblockchain.component";
import CenterRepo from "./components/centerrepo.component";
import SideNav4 from "./components/sidenav4.component";



export const UserContext = createContext({})

export const ThemeContext = createContext({});

const darkThemePreference = () => window.matchMedia("(prefers-color-scheme: dark)").matches;



const App = () => {

    const [userAuth, setUserAuth] = useState({});

    const [ theme, setTheme ] = useState(() => darkThemePreference() ? "light" : "dark" );

    useEffect(() => {

        let userInSession = lookInSession("user");
        let themeInSession = lookInSession("theme");

        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })
        
        if (themeInSession) {
            setTheme(() => {

                document.body.setAttribute('data-theme', themeInSession);

                return themeInSession;
            
            })
        } else {
            document.body.setAttribute('data-theme', theme)
        }

    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <UserContext.Provider value={{userAuth, setUserAuth}}>
                <Routes>
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/editor/:blog_id" element={<Editor />} />
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<HomePage />} />
                        <Route path="dashboard" element={<SideNav />} > 
                            <Route path="blogs" element={<ManageBlogs />} />
                            <Route path="notifications" element={<Notifications />} />
                            <Route path="members" element={<MembersPage />} />
                            <Route path="to-do" element={<TodoList />} />
                            <Route path="bookmark" element={<BookmarkPage />} />
                        </Route>
                        <Route path="settings" element={<SideNav2 />} >  
                            <Route path="edit-profile" element={<EditProfile />} />
                            <Route path="change-password" element={<ChangePassword />} />
                            <Route path="delete-user" element={<DeleteUserPage />} />
                        </Route>
                        <Route path="learn" element={<SideLearn />} >
                            <Route path="dasar" element={<LearnDasar />} />
                            <Route path="analitik" element={<LearnAnalitik />} />
                            <Route path="desain" element={<LearnDesain />} />
                            <Route path="sistem" element={<LearnSistem />} />
                            <Route path="iot" element={<LearnIot />} />
                            <Route path="robotik" element={<LearnRobotik />} />
                            <Route path="nilai" element={<LearnNilai />} />
                        </Route>
                        <Route path="center" element={<SideCenter />} >
                            <Route path="learn" element={<CenterLearn />} />
                            <Route path="ai" element={<CenterAI />} />
                            <Route path="case-study" element={<CenterCase />} />
                            <Route path="craft" element={<CenterDT />} />
                            <Route path="consultation" element={<CenterConsul />} />
                            <Route path="cryptography-blockhain" element={<CenterChain />} />
                            <Route path="repository" element={<CenterRepo />} />
                        </Route>
                        <Route path="ai" element={<SideNav4 />} > 
                            <Route path="tanya-psd" element={<ChatAI />} />
                        </Route>
                        <Route path="signin" element={<UserAuthForm type="masuk" />} /> 
                        <Route path="signup" element={<UserAuthForm type="daftar" />} />
                        <Route path="search/:query" element={<SearchPage />} />
                        <Route path="user/:id" element={<ProfilePage />} />
                        <Route path="blog/:blog_id" element={<BlogPage />}/>
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="projek-kami" element={<OurProjek />} />
                        <Route path="tentang-kami" element={<AboutUsPage />} />
                        <Route path="forum" element={<ForumPage />} />
                        <Route path="center" element={<SideCenter />} />

                        
                        
                        
                    </Route>
                </Routes>
            </UserContext.Provider>
        <Footer />
        </ThemeContext.Provider>
    );

}

export default App;