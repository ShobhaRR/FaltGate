import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import Loader from "../components/Loader";

import { getDashboard } from "../services/dashboardService";

function ApartmentDashboard() {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({

        totalGuests: 0,
        todayGuests: 0,
        checkedIn: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();

            setDashboard(response.data);

        }
        catch (error) {

            alert("Unable to load dashboard");

        }
        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <DashboardLayout>

            <div>
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">Monitor visitor activity and apartment access at a glance.</p>
            </div>

            <div className="dashboard-cards">

                <DashboardCard
                    title="Total Guests"
                    value={dashboard.totalGuests}
                    color="#5D5FEF"
                />

                <DashboardCard
                    title="Today's Guests"
                    value={dashboard.todayGuests}
                    color="#00B894"
                />

                <DashboardCard
                    title="Checked In"
                    value={dashboard.checkedIn}
                    color="#E17055"
                />

            </div>

            <br />

            <div className="form-card">

                <h2>
                    Welcome to FlatGate
                </h2>

                <br />

                <p>

                    Apartment residents can:

                </p>

                <ul>

                    <li>Add guests</li>

                    <li>View guest list</li>

                    <li>Track visitor status</li>

                    <li>Manage profile</li>

                </ul>

            </div>

        </DashboardLayout>

    );

}

export default ApartmentDashboard;