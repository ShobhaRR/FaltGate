import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

import {
    getTodayVisitors,
    checkIn,
    checkOut
} from "../services/securityService";

function VisitorListPage() {

    const [loading, setLoading] = useState(true);

    const [visitors, setVisitors] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadVisitors();

    }, []);

    const loadVisitors = async () => {

        try {

            const response = await getTodayVisitors();

            setVisitors(response.data);

        }
        catch (error) {

            alert("Unable to load visitors");

        }
        finally {

            setLoading(false);

        }

    };

    const handleCheckIn = async (id) => {

        try {

            await checkIn(id);

            loadVisitors();

        }
        catch (error) {

            alert("Check In failed");

        }

    };

    const handleCheckOut = async (id) => {

        try {

            await checkOut(id);

            loadVisitors();

        }
        catch (error) {

            alert("Check Out failed");

        }

    };

    const filteredVisitors = visitors.filter(

        visitor =>
            visitor.guestName
                .toLowerCase()
                .includes(search.toLowerCase())

    );

    if (loading) {

        return <Loader />;

    }

    return (

        <DashboardLayout>

            <div className="form-card">

                <h1>Today's Visitors</h1>

                <br />

                <SearchBar
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <br />

                <table className="guest-table">

                    <thead>

                    <tr>

                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Flat No</th>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        filteredVisitors.map(visitor => (

                            <tr key={visitor.id}>

                                <td>
                                    {visitor.guestName}
                                </td>

                                <td>
                                    {visitor.guestMobile}
                                </td>

                                <td>
                                    {visitor.flatNo}
                                </td>

                                <td>
                                    {visitor.purpose}
                                </td>

                                <td>

                                    <span
                                        className={
                                            visitor.status === "ENTERED"
                                                ? "status-entered"
                                                : visitor.status === "EXITED"
                                                ? "status-exited"
                                                : "status-pending"
                                        }
                                    >

                                        {visitor.status}

                                    </span>

                                </td>

                                <td>

                                    {

                                        visitor.status === "PENDING" &&

                                        <button
                                            className="checkin-btn"
                                            onClick={() =>
                                                handleCheckIn(
                                                    visitor.id
                                                )
                                            }
                                        >

                                            Check In

                                        </button>

                                    }

                                    {

                                        visitor.status === "ENTERED" &&

                                        <button
                                            className="checkout-btn"
                                            onClick={() =>
                                                handleCheckOut(
                                                    visitor.id
                                                )
                                            }
                                        >

                                            Check Out

                                        </button>

                                    }

                                </td>

                            </tr>

                        ))

                    }

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

}

export default VisitorListPage;