import { NavLink } from "react-router-dom";

function AppHeader() {
    const menu = [
        {
            path: "/",
            title: "Home"
        },
        {
            path: "/blogs",
            title: "Blogs"
        },
        {
            path: "/about-us",
            title: "About us"
        }

    ]

    return (
        <header className="py-3 bg-primary d-flex">
            <div className="d-flex justify-content-center align-self-center text-white mx-3">
                    <span className="logo">MyBlog!</span>
                </div>
            <nav className="container d-flex justify-content-center">
                
                <ul className="nav d-flex gap-3">
                    {menu.map((page) => (
                        <li className="nav-item" key={page.title}>
                            <NavLink className="nav-link" to={page.path}>
                                {page.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>

    )
}

export default AppHeader;