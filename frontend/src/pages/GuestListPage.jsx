import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import SearchBar from "../components/SearchBar";
import GuestTable from "../components/GuestTable";
import Loader from "../components/Loader";

import {
    getGuests,
    cancelGuest
} from "../services/guestService";

function GuestListPage() {

    const [loading, setLoading] = useState(true);

    const [guests, setGuests] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadGuests();

    }, []);

    const loadGuests = async () => {

        try {

            const response = await getGuests();

            setGuests(response.data);

        }
        catch (error) {

            alert("Unable to load guest list");

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

            alert("Unable to cancel");

        }

    };

    const filteredGuests = guests.filter((guest) =>

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

                <div style={{ marginBottom: "16px" }}>
                    <h1 className="page-title">Guest List</h1>
                    <p className="page-subtitle">Review and manage your visitors in one place.</p>
                </div>

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
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        filteredGuests.map((guest) => (

                            <tr key={guest.id}>

                                <td>
                                    {guest.guestName}
                                </td>

                                <td>
                                    {guest.guestMobile}
                                </td>

                                <td>
                                    {guest.purpose}
                                </td>

                                <td>
                                    {guest.status}
                                </td>

                                <td>

                                    {

                                        guest.status === "PENDING" &&

                                        <button
                                            className="cancel-btn"
                                            onClick={() =>
                                                handleCancel(
                                                    guest.id
                                                )
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

export default GuestListPage;