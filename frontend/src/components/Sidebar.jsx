import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");

    };

    return (

        <div className="sidebar">

            <div className="sidebar-brand">

                <div className="brand-badge">FG</div>

                <h2 className="logo">FlatGate</h2>

            </div>

            {/* ADMIN MENU */}
            {

                role === "ADMIN" &&

                <>

                    <NavLink className="menu-item" to="/admin-dashboard">
                        Dashboard
                    </NavLink>

                    <NavLink className="menu-item" to="/apartments">
                        Apartments
                    </NavLink>

                    <NavLink className="menu-item" to="/all-guests">
                        All Guests
                    </NavLink>

                    <NavLink className="menu-item" to="/admin-add-guest">
                        Add Guest
                    </NavLink>

                </>

            }

            {/* SECURITY MENU */}
            {

                role === "SECURITY" &&

                <>

                    <NavLink className="menu-item" to="/security-dashboard">
                        Dashboard
                    </NavLink>

                    <NavLink className="menu-item" to="/visitors">
                        Today's Visitors
                    </NavLink>

                     <NavLink className="menu-item" to="/all-visitors">
                       All Visitors
                    </NavLink>

                </>

            }

            {/* APARTMENT MENU */}
            {

                role === "APARTMENT" &&

                <>

                    <NavLink className="menu-item" to="/dashboard">
                        Dashboard
                    </NavLink>

                    <NavLink className="menu-item" to="/add-guest">
                        Add Guest
                    </NavLink>

                    <NavLink className="menu-item" to="/my-guests">
                        My Guests
                    </NavLink>

                    <NavLink className="menu-item" to="/profile">
                        Profile
                    </NavLink>

                </>

            }

            <button
                className="logout-btn"
                onClick={logout}
            >

                Logout

            </button>

        </div>

    );

}

export default Sidebar;