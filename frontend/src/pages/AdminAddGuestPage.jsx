import { useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import { addGuestByAdmin } from "../services/adminService";

function AdminAddGuestPage() {

    const [form, setForm] = useState({

        blockName: "",
        flatNo: "",
        guestName: "",
        guestMobile: "",
        purpose: "",
        visitDate: "",
        visitTime: "",
        vehicleNumber: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.blockName ||
            !form.flatNo ||
            !form.guestName ||
            !form.guestMobile) {

            alert("Please fill all required fields");
            return;

        }

        try {

            setLoading(true);

            await addGuestByAdmin(form);

            alert("Guest added successfully");

            setForm({

                blockName: "",
                flatNo: "",
                guestName: "",
                guestMobile: "",
                purpose: "",
                visitDate: "",
                visitTime: "",
                vehicleNumber: ""

            });

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to save guest"
            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="form-card">

                <h1>Add Guest</h1>

                <br />

                <form onSubmit={handleSubmit}>

                    <div className="form-row">

                        <label>Block Name *</label>

                        <input
                            className="form-control"
                            name="blockName"
                            value={form.blockName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <label>Flat Number *</label>

                        <input
                            className="form-control"
                            name="flatNo"
                            value={form.flatNo}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <label>Guest Name *</label>

                        <input
                            className="form-control"
                            name="guestName"
                            value={form.guestName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <label>Guest Mobile *</label>

                        <input
                            className="form-control"
                            name="guestMobile"
                            value={form.guestMobile}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <label>Purpose</label>

                        <input
                            className="form-control"
                            name="purpose"
                            value={form.purpose}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <label>Visit Date</label>

                        <input
                            type="date"
                            className="form-control"
                            name="visitDate"
                            value={form.visitDate}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <label>Visit Time</label>

                        <input
                            type="time"
                            className="form-control"
                            name="visitTime"
                            value={form.visitTime}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-row">

                        <label>Vehicle Number</label>

                        <input
                            className="form-control"
                            name="vehicleNumber"
                            value={form.vehicleNumber}
                            onChange={handleChange}
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

export default AdminAddGuestPage;