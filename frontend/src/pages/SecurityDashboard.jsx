import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import Loader from "../components/Loader";

import { getSecurityDashboard } from "../services/securityService";

function SecurityDashboard() {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({

        todayVisitors: 0,
        checkedIn: 0,
        expectedVisitors: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getSecurityDashboard();

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

            <h1>
                Security Dashboard
            </h1>

            <div className="dashboard-cards">

                <DashboardCard
                    title="Today's Visitors"
                    value={dashboard.todayVisitors}
                    color="#5D5FEF"
                />

                <DashboardCard
                    title="Checked In"
                    value={dashboard.checkedIn}
                    color="#00B894"
                />

                <DashboardCard
                    title="Expected Visitors"
                    value={dashboard.expectedVisitors}
                    color="#E17055"
                />

            </div>

            <br />

            <div className="form-card">

                <h2>
                    Security Operations
                </h2>

                <br />

                <ul>

                    <li>View today's visitors</li>

                    <li>Check In guests</li>

                    <li>Check Out guests</li>

                    <li>Monitor apartment visitors</li>

                </ul>

            </div>

        </DashboardLayout>

    );

}

export default SecurityDashboard;