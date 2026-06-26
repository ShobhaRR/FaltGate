import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/authService";

import "../styles/global.css";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loading, setLoading] = useState(false);

    const validate = () => {

        let valid = true;

        setEmailError("");
        setPasswordError("");

        if (!email) {

            setEmailError("Email is required");
            valid = false;

        }

        if (!password) {

            setPasswordError("Password is required");
            valid = false;

        }

        return valid;
    };

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!validate()) {

            return;

        }

        try {

            setLoading(true);

            const response = await login({

                email,
                password

            });

            const { token, role } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            if (role === "ADMIN") {

                navigate("/admin-dashboard");

            } else if (role === "SECURITY") {

                navigate("/security-dashboard");

            } else {

                navigate("/dashboard");

            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Invalid Login"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <div className="auth-brand">

                    <div className="brand-badge">FG</div>

                    <div>

                        <h1 className="auth-title">Welcome back</h1>

                        <p className="auth-subtitle">
                            Sign in to manage visitors and access with ease.
                        </p>

                    </div>

                </div>

                <form className="auth-form" onSubmit={handleLogin}>

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

                            {emailError}

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
                                setPassword(
                                    e.target.value
                                )
                            }
                            autoComplete="current-password"
                        />

                        <div className="error">

                            {passwordError}

                        </div>

                    </div>

                    <button
                        className="primary-btn"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }

                    </button>

                </form>

                <div className="bottom-text">

                    Don't have an account?

                    <Link
                        className="bottom-link"
                        to="/register"
                    >

                        Create account

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default LoginPage;