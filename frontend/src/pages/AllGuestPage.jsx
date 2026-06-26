import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

import { getAllGuests } from "../services/adminService";

function AllGuestPage() {

    const [loading, setLoading] = useState(true);

    const [guests, setGuests] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadGuests();

    }, []);

    const loadGuests = async () => {

        try {

            const response = await getAllGuests();

            setGuests(response.data);

        }
        catch (error) {

            alert("Unable to load guests");

        }
        finally {

            setLoading(false);

        }

    };

    const filteredGuests = guests.filter(

        guest =>
            guest.guestName.toLowerCase().includes(search.toLowerCase())
            ||
            guest.flatNo.toLowerCase().includes(search.toLowerCase())

    );

    if (loading) {

        return <Loader />;

    }

    return (

        <DashboardLayout>

            <div className="form-card">

                <h1>All Guests</h1>

                <br />

                <SearchBar
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <br />

                <table className="guest-table">

                    <thead>

                    <tr>

                        <th>Guest</th>
                        <th>Mobile</th>
                        <th>Block</th>
                        <th>Flat No</th>
                        <th>Purpose</th>
                        <th>Visit Date</th>
                        <th>Status</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        filteredGuests.map(guest => (

                            <tr key={guest.id}>

                                <td>{guest.guestName}</td>

                                <td>{guest.guestMobile}</td>

                                <td>{guest.blockName}</td>

                                <td>{guest.flatNo}</td>

                                <td>{guest.purpose}</td>

                                <td>{guest.visitDate}</td>

                                <td>

                                    {

                                        guest.status === "IN" ?

                                            <span className="status-entered">

                                                IN

                                            </span>

                                            :

                                        guest.status === "OUT" ?

                                            <span className="status-exited">

                                                OUT

                                            </span>

                                            :

                                            <span className="status-pending">

                                                PENDING

                                            </span>

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

export default AllGuestPage;