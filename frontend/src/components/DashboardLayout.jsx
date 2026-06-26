import Sidebar from "./Sidebar";
import Header from "./Header";

import "../styles/dashboard.css";

function DashboardLayout({ children }) {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="content">

                <Header />

                <div className="main">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default DashboardLayout;