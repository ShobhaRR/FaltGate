import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import Loader from "../components/Loader";

import {
    getProfile,
    updateProfile
} from "../services/profileService";

function ProfilePage() {

    const [loading, setLoading] = useState(true);

    const [profile, setProfile] = useState({

        name: "",
        email: "",
        mobile: "",
        blockName: "",
        flatNo: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await getProfile();

            setProfile(response.data);

        }
        catch (error) {

            alert("Unable to load profile");

        }
        finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setProfile({

            ...profile,
            [e.target.name]: e.target.value

        });

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            await updateProfile(profile);

            alert("Profile updated successfully");

        }
        catch (error) {

            alert("Unable to update profile");

        }

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <DashboardLayout>

            <div className="form-card">

                <h1>My Profile</h1>

                <br />

                <form onSubmit={handleUpdate}>

                    <div className="form-row">

                        <label>Name</label>

                        <input
                            className="form-control"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <label>Email</label>

                        <input
                            className="form-control"
                            name="email"
                            value={profile.email}
                            disabled
                        />

                    </div>

                    <div className="form-row">

                        <label>Mobile Number</label>

                        <input
                            className="form-control"
                            name="mobile"
                            value={profile.mobile}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <label>Block Name</label>

                        <input
                            className="form-control"
                            name="blockName"
                            value={profile.blockName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <label>Flat Number</label>

                        <input
                            className="form-control"
                            name="flatNo"
                            value={profile.flatNo}
                            onChange={handleChange}
                        />

                    </div>

                    <button className="save-btn">

                        Update Profile

                    </button>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default ProfilePage;