import { Link } from "react-router-dom";
import lightPageNotFoundImg from "../imgs/404.svg";
import darkPageNotFoundImg from "../imgs/404.svg";
import lightFullLogo from "../imgs/psdDark.png";
import darkFullLogo from "../imgs/PSDNormal.png";
import { ThemeContext } from "../App";
import { useContext } from "react";

const PageNotFound = () => {

    let { theme } = useContext(ThemeContext);

    return (
        <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">

            <img src={ theme == "light" ? darkPageNotFoundImg : lightPageNotFoundImg } className="select-none w-72 aspect-square object-cover rounded" />

            <h1 className="text-4xl font-gelasio leading-7">Page not found</h1>
            <p className="text-dark-grey text-xl leading-7 -mt-8">The page you are looking for does not exists. Head back to the <Link to="/" className="text-black underline">home page</Link></p>

            <div className="mt-auto">
                <img src={ theme == "light" ? darkFullLogo : lightFullLogo } className="h-12 object-contain block mx-auto select-none" />
                <p className="mt-5 text-dark-grey">Read millions of Material and Tutorial here</p>
            </div>

        </section>
    )
}

export default PageNotFound;