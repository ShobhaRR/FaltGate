import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../services/authService";

import "../styles/global.css";

function RegisterPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [blockName, setBlockName] = useState("");
    const [flatNo, setFlatNo] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const validate = () => {

        let temp = {};

        if (!name.trim())
            temp.name = "Name is required";

        if (!email.trim())
            temp.email = "Email is required";

        if (!mobile.trim())
            temp.mobile = "Mobile number is required";

        if (!blockName.trim())
            temp.blockName = "Block name is required";

        if (!flatNo.trim())
            temp.flatNo = "Flat number is required";

        if (!password.trim())
            temp.password = "Password is required";

        setErrors(temp);

        return Object.keys(temp).length === 0;
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (!validate())
            return;

        try {

            setLoading(true);

            await register({

                name,
                email,
                mobile,
                blockName,
                flatNo,
                password,
                role: "APARTMENT"

            });

            alert("Registration Successful");

            navigate("/");

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <div className="auth-brand">

                    <div className="brand-badge">✦</div>

                    <div>

                        <h1 className="auth-title">Create account</h1>

                        <p className="auth-subtitle">
                            Register your apartment and start managing visitors.
                        </p>

                    </div>

                </div>

                <form className="auth-form" onSubmit={handleRegister}>

                    <div className="input-row">

                        <div className="input-group">

                            <label>Owner Name</label>

                            <input
                                className="input-box"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                autoComplete="name"
                            />

                            <div className="error">
                                {errors.name}
                            </div>

                        </div>

                        <div className="input-group">

                            <label>Email</label>

                            <input
                                className="input-box"
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                autoComplete="email"
                            />

                            <div className="error">
                                {errors.email}
                            </div>

                        </div>

                    </div>

                    <div className="input-row">

                        <div className="input-group">

                            <label>Mobile Number</label>

                            <input
                                className="input-box"
                                placeholder="Enter Mobile Number"
                                value={mobile}
                                onChange={(e) =>
                                    setMobile(e.target.value)
                                }
                                autoComplete="tel"
                            />

                            <div className="error">
                                {errors.mobile}
                            </div>

                        </div>

                        <div className="input-group">

                            <label>Block Name</label>

                            <input
                                className="input-box"
                                placeholder="Example : A"
                                value={blockName}
                                onChange={(e) =>
                                    setBlockName(e.target.value)
                                }
                            />

                            <div className="error">
                                {errors.blockName}
                            </div>

                        </div>

                    </div>

                    <div className="input-row">

                        <div className="input-group">

                            <label>Flat Number</label>

                            <input
                                className="input-box"
                                placeholder="Example : A-101"
                                value={flatNo}
                                onChange={(e) =>
                                    setFlatNo(e.target.value)
                                }
                            />

                            <div className="error">
                                {errors.flatNo}
                            </div>

                        </div>

                        <div className="input-group">

                            <label>Password</label>

                            <input
                                className="input-box"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                autoComplete="new-password"
                            />

                            <div className="error">
                                {errors.password}
                            </div>

                        </div>

                    </div>

                    <button
                        className="primary-btn"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Registering..."
                                : "Register"
                        }

                    </button>

                </form>

                <div className="bottom-text">

                    Already have an account?

                    <Link
                        className="bottom-link"
                        to="/"
                    >

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default RegisterPage;