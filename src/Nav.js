import { Link, useLocation } from 'react-router-dom';

const Nav = ({ search, setSearch }) => {
    const location = useLocation();
    
    // Hide search bar on specific pages
    const hideSearchRoutes = ['/login', '/register', '/account', '/about'];
    const shouldHideSearch = hideSearchRoutes.includes(location.pathname);

    return (
        <nav className="Nav">
            {!shouldHideSearch && (
                <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="search">Search Posts</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search Posts"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            )}
            <ul style={shouldHideSearch ? { width: '100%', justifyContent: 'flex-end', marginLeft: 'auto' } : {}}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/account">Account</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav