import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import Loader from "../components/Loader";

import { getAdminDashboard } from "../services/adminService";

function AdminDashboard() {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({

        totalApartments: 0,
        totalGuests: 0,
        todayVisitors: 0,
        pendingVisitors: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getAdminDashboard();

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

            <h1>Admin Dashboard</h1>

            <div className="dashboard-cards">

                <DashboardCard
                    title="Apartments"
                    value={dashboard.totalApartments}
                    color="#5D5FEF"
                />

                <DashboardCard
                    title="Guests"
                    value={dashboard.totalGuests}
                    color="#00B894"
                />

                <DashboardCard
                    title="Today's Visitors"
                    value={dashboard.todayVisitors}
                    color="#E17055"
                />

                <DashboardCard
                    title="Pending"
                    value={dashboard.pendingVisitors}
                    color="#D63031"
                />

            </div>

        </DashboardLayout>

    );

}

export default AdminDashboard;