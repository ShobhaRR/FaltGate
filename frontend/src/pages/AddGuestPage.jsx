import { useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import { addGuest } from "../services/guestService";

function AddGuestPage() {

    const [guestName, setGuestName] = useState("");
    const [guestMobile, setGuestMobile] = useState("");
    const [purpose, setPurpose] = useState("");
    const [visitDate, setVisitDate] = useState("");
    const [visitTime, setVisitTime] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSave = async (e) => {

        e.preventDefault();

        if (!guestName) {

            alert("Guest name is required");
            return;

        }

        if (!guestMobile) {

            alert("Mobile number is required");
            return;

        }

        try {

            setLoading(true);

            await addGuest({

                guestName,
                guestMobile,
                purpose,
                visitDate,
                visitTime,
                vehicleNumber

            });

            alert("Guest added successfully");

            setGuestName("");
            setGuestMobile("");
            setPurpose("");
            setVisitDate("");
            setVisitTime("");
            setVehicleNumber("");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to save guest"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="form-card">

                <h1>Add Guest</h1>

                <br />

                <form onSubmit={handleSave}>

                    <div className="form-row">

                        <label>Guest Name</label>

                        <input
                            className="form-control"
                            value={guestName}
                            onChange={(e) =>
                                setGuestName(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-row">

                        <label>Mobile Number</label>

                        <input
                            className="form-control"
                            value={guestMobile}
                            onChange={(e) =>
                                setGuestMobile(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-row">

                        <label>Purpose</label>

                        <input
                            className="form-control"
                            value={purpose}
                            onChange={(e) =>
                                setPurpose(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-row">

                        <label>Visit Date</label>

                        <input
                            type="date"
                            className="form-control"
                            value={visitDate}
                            onChange={(e) =>
                                setVisitDate(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-row">

                        <label>Visit Time</label>

                        <input
                            type="time"
                            className="form-control"
                            value={visitTime}
                            onChange={(e) =>
                                setVisitTime(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-row">

                        <label>Vehicle Number</label>

                        <input
                            className="form-control"
                            value={vehicleNumber}
                            onChange={(e) =>
                                setVehicleNumber(e.target.value)
                            }
                        />

                    </div>

                    <button
                        className="save-btn"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Saving..."
                                : "Save Guest"
                        }

                    </button>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default AddGuestPage;