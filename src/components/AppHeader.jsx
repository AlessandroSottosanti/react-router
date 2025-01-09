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
        }

    ]

    return (
        <header className="py-3 bg-primary">
            <nav className="container d-flex justify-content-center">
                <ul className="nav d-flex gap-3">
                    {menu.map((page) => (
                        <li className="nav-item" key={page.title}>
                            <NavLink className="nav-link text-white" to={page.path}>
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