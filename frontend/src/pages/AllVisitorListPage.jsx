import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

import {
    getAllVisitors,
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

            const response = await getAllVisitors();

            console.log("Visitors:", response.data);

            setVisitors(response.data);

        }
        catch (error) {

            console.error(error);

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

            console.error(error);

            alert("Check In failed");

        }

    };

    const handleCheckOut = async (id) => {

        try {

            await checkOut(id);

            loadVisitors();

        }
        catch (error) {

            console.error(error);

            alert("Check Out failed");

        }

    };

    const isToday = (visitDate) => {

        if (!visitDate) return false;

        const today = new Date()
            .toISOString()
            .split("T")[0];

        return visitDate === today;

    };

    const filteredVisitors = visitors.filter(

        (visitor) =>

            visitor.guestName?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            visitor.flatNo?.toLowerCase()
                .includes(search.toLowerCase())

    );

    if (loading) {

        return <Loader />;

    }

    return (

        <DashboardLayout>

            <div className="form-card">

                <h1>Visitor List</h1>

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

                            <th>Guest Name</th>
                            <th>Mobile</th>
                            <th>Flat No</th>
                            <th>Purpose</th>
                            <th>Visit Date</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredVisitors.length > 0 ?

                                filteredVisitors.map((visitor) => (

                                    <tr key={visitor.id}>

                                        <td>{visitor.guestName}</td>

                                        <td>{visitor.guestMobile}</td>

                                        <td>{visitor.flatNo || "-"}</td>

                                        <td>{visitor.purpose}</td>

                                        <td>{formatDate(visitor.visitDate)}</td>

                                        <td>

                                            <span
                                                className={
                                                    visitor.status === "IN"
                                                        ? "status-entered"
                                                        : visitor.status === "OUT"
                                                            ? "status-exited"
                                                            : "status-pending"
                                                }
                                            >

                                                {visitor.status}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                visitor.status === "PENDING"
                                                &&
                                                isToday(visitor.visitDate)

                                                &&

                                                <button
                                                    className="checkin-btn"
                                                    onClick={() =>
                                                        handleCheckIn(visitor.id)
                                                    }
                                                >

                                                    Check In

                                                </button>

                                            }

                                            {

                                                visitor.status === "IN"

                                                &&

                                                <button
                                                    className="checkout-btn"
                                                    onClick={() =>
                                                        handleCheckOut(visitor.id)
                                                    }
                                                >

                                                    Check Out

                                                </button>

                                            }

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td colSpan="7">

                                        No visitors found

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

   function formatDate(dateString) {

    if (!dateString) return "-";

    return new Date(dateString).toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}

}

export default VisitorListPage;