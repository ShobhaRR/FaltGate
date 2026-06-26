import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";

import { getApartments } from "../services/adminService";

function ApartmentListPage() {

    const [loading, setLoading] = useState(true);

    const [apartments, setApartments] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadApartments();

    }, []);

    const loadApartments = async () => {

        try {

            const response = await getApartments();

            setApartments(response.data);

        }
        catch (error) {

            alert("Unable to load apartments");

        }
        finally {

            setLoading(false);

        }

    };

    const filteredApartments = apartments.filter(

        apartment =>
            apartment.name.toLowerCase().includes(search.toLowerCase())
            ||
            apartment.flatNo.toLowerCase().includes(search.toLowerCase())

    );

    if (loading) {

        return <Loader />;

    }

    return (

        <DashboardLayout>

            <div className="form-card">

                <h1>Apartment List</h1>

                <br />

                <SearchBar
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <br />

                <table className="guest-table">

                    <thead>

                    <tr>

                        <th>Owner</th>
                        <th>Block</th>
                        <th>Flat No</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Status</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        filteredApartments.map(apartment => (

                            <tr key={apartment.id}>

                                <td>{apartment.name}</td>

                                <td>{apartment.blockName}</td>

                                <td>{apartment.flatNo}</td>

                                <td>{apartment.mobile}</td>

                                <td>{apartment.email}</td>

                                <td>

                                    {

                                        apartment.active ?

                                            <span className="status-entered">

                                                Active

                                            </span>

                                            :

                                            <span className="status-exited">

                                                Inactive

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

export default ApartmentListPage;