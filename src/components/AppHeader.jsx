import { NavLink } from "react-router-dom";

function AppHeader() {
    const menu = [
        {
            path: "/",
            title:"Home"
        },
        {
            path: "/blogs",
            title: "Blogs"
        }
        
    ]

    return (
        <header className="d-flex justify-content-center align-items-center py-3 bg-primary">
            <ul className="d-flex gap-3">
                {menu.map((page) => (
                    <li key={page.title}>
                        <NavLink to={page.path}>{page.title}</NavLink>
                    </li>
                ))}
            </ul>
        </header>
    )
}

export default AppHeader;