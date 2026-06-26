import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

import {
    getMyGuests,
    cancelGuest
} from "../services/guestService";

function MyGuestListPage() {

    const [loading, setLoading] = useState(true);

    const [guests, setGuests] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadGuests();

    }, []);

    const loadGuests = async () => {

        try {

            const response = await getMyGuests();

            setGuests(response.data);

        }
        catch (error) {

            alert("Unable to load guests");

        }
        finally {

            setLoading(false);

        }

    };

    const handleCancel = async (id) => {

        if (!window.confirm("Cancel this guest?")) {

            return;

        }

        try {

            await cancelGuest(id);

            loadGuests();

        }
        catch (error) {

            alert("Unable to cancel guest");

        }

    };

    const filteredGuests = guests.filter(

        guest =>
            guest.guestName
                .toLowerCase()
                .includes(search.toLowerCase())

    );

    if (loading) {

        return <Loader />;

    }

    return (

        <DashboardLayout>

            <div className="form-card">

                <h1>My Guests</h1>

                <br />

                <SearchBar
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <br />

                <table className="guest-table">

                    <thead>

                    <tr>

                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Purpose</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        filteredGuests.map((guest) => (

                            <tr key={guest.id}>

                                <td>{guest.guestName}</td>

                                <td>{guest.guestMobile}</td>

                                <td>{guest.purpose}</td>

                                <td>{guest.visitDate}</td>

                                <td>{guest.visitTime}</td>

                                <td>

                                    {

                                        guest.status === "IN"

                                            ?

                                            <span className="status-entered">

                                                IN

                                            </span>

                                            :

                                        guest.status === "OUT"

                                            ?

                                            <span className="status-exited">

                                                OUT

                                            </span>

                                            :

                                            <span className="status-pending">

                                                PENDING

                                            </span>

                                    }

                                </td>

                                <td>

                                    {

                                        guest.status === "PENDING"

                                        &&

                                        <button
                                            className="cancel-btn"
                                            onClick={() =>
                                                handleCancel(guest.id)
                                            }
                                        >

                                            Cancel

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

export default MyGuestListPage;